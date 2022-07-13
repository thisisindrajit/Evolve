import { configureStore } from "@reduxjs/toolkit";
import userAssetsReducer from "./Reducers/userAssetsReducer";

let initialState = {
  overlay: 0,
  editFormData: {},
  stocks: [],
  stockLoading: 1,
  stockPurchasePrice: 0,
  crypto: [],
  cryptoLoading: 1,
  cryptoPurchasePrice: 0,
  bonds: [],
  bondLoading: 1,
  bondPurchasePrice: 0,
  others: [],
  othersLoading: 1,
  othersPurchasePrice: 0,
};

export const store = configureStore({
  reducer: userAssetsReducer,
  preloadedState: initialState,
});
