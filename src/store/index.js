import { ENV } from "@/constant/environment";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Reducer/authReducer";

// Lưu trạng thái vào localStorage
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.error('Could not save state', e);
  }
};

// Khôi phục trạng thái từ localStorage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Could not load state', e);
    return undefined;
  }
};

const preloadedState = loadStateFromLocalStorage();

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState,
  devTools: ENV === 'development',
});

// Lưu trạng thái vào localStorage mỗi khi trạng thái thay đổi
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});
export default store;
