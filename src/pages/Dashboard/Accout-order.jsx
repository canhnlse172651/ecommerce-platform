import { PATHS } from "@/constant/path";
import useQuery from "@/hooks/useQuery";
import { formatCurrencyUs } from "@/utils/formatCurrency";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { orderServices } from "@/services/orderService";
const AccountOrder = () => {
  const { cartInfor, cartLoading } = useSelector((state) => state.cart);
  console.log("🚀---->cartInfor", cartInfor);

  const {
    data: orderData,
    error: orderError,
    loading: orderLoading,
  } = useQuery(orderServices.getOrder);

  const listOrder = orderData?.orders || [];

  // Duyệt qua từng object trong array chính và gộp các thuộc tính lại
const allCompleteProducts = listOrder.map((item) => {
    return item.product.map((prod, index) => {
      return {
        ...prod,
        variant: item.variant[index],
        totalProduct: item.totalProduct[index],
        quantity: item.quantity[index],
      };
    });
  }).flat();
  

  console.log("🚀---->productOrder", allCompleteProducts);

  return (
    <div
      className="tab-pane fade show active"
      id="tab-orders"
      role="tabpanel"
      aria-labelledby="tab-orders-link"
    >
      <p>No order has been made yet.</p>
      <Link to={PATHS.PRODUCTS} className="btn btn-outline-primary-2">
        <span>GO SHOP</span>
        <i className="icon-long-arrow-right" />
      </Link>
      <br />
      <br />
      <table className="table table-cart table-mobile">
        <thead>
          <tr>
            <th>Product</th>
            <th className="text-center">Price</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {allCompleteProducts?.map((item, index) => {
            const { images, price, quantity, totalProduct, slug, name } =
              item || {};

            const detailPath = PATHS.PRODUCTS + `/${slug}`;

            let imagePath = images?.[0];
            // Tìm vị trí của "https://" cuối cùng trong chuỗi
            const lastOccurrence = imagePath?.lastIndexOf("https://");
            // Lấy URL từ vị trí "https://" cuối cùng
            if (lastOccurrence > -1) {
              imagePath = imagePath.substring(lastOccurrence);
            }
            return (
              <>
                <tr key={index}>
                  <td className="product-col">
                    <div className="product">
                      <figure className="product-media">
                        <Link to={detailPath}>
                          <img alt="Product image" src={imagePath} />
                        </Link>
                      </figure>
                      <h3 className="product-title">
                        <Link to={detailPath}>{name}</Link>
                      </h3>
                    </div>
                  </td>
                  <td className="price-col text-center">
                    {formatCurrencyUs(price)}
                  </td>
                  <td className="quantity-col text-center">{quantity} </td>
                  <td className="total-col text-center">
                    {formatCurrencyUs(totalProduct)}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AccountOrder;
