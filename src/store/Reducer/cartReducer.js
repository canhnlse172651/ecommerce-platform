import { cartService } from "@/services/cartService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { sumArrayNumber } from "@/utils/calculate";
const initialState = {
  cartInfor: {},
  cartLoading: false,
};

export const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    updateCacheCart: (state, action) => {
      state.cartInfor = action.payload || state.cartInfor;
    },
    clearCart: (state) => {
      state.cartInfor = {};
    },
  },

  extraReducers: (builder) => {
    // handleGetCart
    builder.addCase(handleGetCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleGetCart.fulfilled, (state, action) => {
      state.cartLoading = false;
      if (action.payload) {
        state.cartInfor = action.payload;
      }
    });
    builder.addCase(handleGetCart.rejected, (state) => {
      state.cartLoading = false;
    });

    // handleAddCart
    builder.addCase(handleAddCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleAddCart.fulfilled, (state, action) => {
      state.cartLoading = false;
      if (action.payload) {
        state.cartInfor = action.payload;
      }
    });
    builder.addCase(handleAddCart.rejected, (state) => {
      state.cartLoading = false;
    });

    // handleRemoveCart
    builder.addCase(handleRemoveCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleRemoveCart.fulfilled, (state, action) => {
      state.cartLoading = false;
      if (action.payload) {
        state.cartInfor = action.payload;
      }
    });
    builder.addCase(handleRemoveCart.rejected, (state) => {
      state.cartLoading = false;
    });

    //update cart
    builder
      .addCase(handleUpdateCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(handleUpdateCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartInfor = action.payload;
      })
      .addCase(handleUpdateCart.rejected, (state, action) => {
        state.cartLoading = false;
      });
  },
});

export const { updateCacheCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const handleGetCart = createAsyncThunk(
  "cart/get",
  async (_, thunkApi) => {
    try {
      const cartRes = await cartService.getCart();

      return cartRes?.data?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);
export const handleAddCart = createAsyncThunk(
  "cart/add",
  async (actionPayload, thunkApi) => {
    try {
      const { addId, addColor, addQuantity, addPrice } = actionPayload;
      const { cartInfor } = thunkApi.getState()?.cart || {};
     

      // find the product already exit on cart

      let addPayload = {};
      if (cartInfor?.id) {
        const matchIndex = cartInfor.product.findIndex(
          (product, index) =>
            product.id === addId && cartInfor.variant[index] === addColor
        );

        const newProduct = cartInfor.product?.map((product) => product.id);

        const newQuantity = [...(cartInfor?.quantity ?? [])];
        const newVariant = [...(cartInfor?.variant ?? [])];
        const newTotalProduct = [...(cartInfor?.totalProduct ?? [])];

        if (matchIndex > -1) {
          newQuantity[matchIndex] =
            Number(newQuantity[matchIndex]) + Number(addQuantity);
          newTotalProduct[matchIndex] =
            Number(newTotalProduct[matchIndex]) + addPrice * addQuantity;
        } else {
          newProduct.push(addId);
          newQuantity.push(Number(addQuantity));
          newTotalProduct.push(Number(addPrice) * Number(addQuantity));
          newVariant.push(addColor);
        }
        const newSubtotal =
          newTotalProduct.reduce(
            (curr, next) => Number(curr) + Number(next),
            0
          ) || 0;

        const newTotal = newSubtotal - cartInfor.discount;
        addPayload = {
          ...cartInfor,
          product: newProduct,
          quantity: newQuantity,
          variant: newVariant,
          subTotal: newSubtotal,
          total: newTotal,
          totalProduct: newTotalProduct,
        };
      } else {
        addPayload = {
          product: [addId],
          quantity: [addQuantity],
          variant: [addColor],
          totalProduct: [addPrice * addQuantity],
          subTotal: Number(addPrice * addQuantity),
          total: Number(addPrice * addQuantity),
          discount: 0,
          paymentMethod: "",
        };
      }

      const cartRes = await cartService.updateCart(addPayload);
      thunkApi.dispatch(handleGetCart());
      message.success("Add To Cart Successfully");
      return cartRes?.data?.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const handleRemoveCart = createAsyncThunk(
  "cart/removeProduct",
  async (actionPayload, thunkApi) => {
    const { removeIndex } = actionPayload || {};
    const { getState, dispatch, rejectWithValue } = thunkApi;
    const { cartInfor } = getState()?.cart || {};

    if (removeIndex < 0) return false;

    try {
      const newProduct = cartInfor.product
        ?.filter((_, index) => index !== removeIndex)
        .map((item) => item.id);
      const newQuantity = cartInfor.quantity?.filter(
        (_, index) => index !== removeIndex
      );
      const newVariant = cartInfor.variant?.filter(
        (_, index) => index !== removeIndex
      );
      const newTotalProduct = cartInfor.totalProduct?.filter(
        (_, index) => index !== removeIndex
      );

      const newSubtotal = sumArrayNumber(newTotalProduct);
      const newTotal =
        newSubtotal -
        (cartInfor.discount ?? 0) +
        (cartInfor.shipping?.price ?? 0);

      const updatePayload = {
        ...cartInfor,
        product: newProduct,
        quantity: newQuantity,
        variant: newVariant,
        totalProduct: newTotalProduct,
        subTotal: newSubtotal,
        total: newTotal,
        shipping: newProduct?.length > 0 ? cartInfor.shipping : {},
        discount: newProduct?.length > 0 ? cartInfor.discount : 0,
      };
      const cartRes = await cartService.updateCart(updatePayload);
      dispatch(handleGetCart());
      message.success("Delete product form cart success");
      return cartRes?.data?.data;
    } catch (error) {
      rejectWithValue(error);
      message.error("Delete product from cart fail");
      console.log("error", error);
    }
  }
);

export const handleUpdateCart = createAsyncThunk(
  "cart/updateCart",
  async (actionPayload, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    try {
      const cartRes = await cartService.updateCart(actionPayload);
      dispatch(handleGetCart());
      message.success("Update Cart Successfully");
      return cartRes?.data?.data;
    } catch (error) {
      console.log("error", error);
      message.error("Update Cart Fail");
      return rejectWithValue(error); // Trả về lỗi qua rejectWithValue
    }
  }
);
