import { configureStore } from "@reduxjs/toolkit";
import userassetsreducer from "./Reducers/userassetsreducer.js";

let initialState = {
  overlay: 0,
  editFormData: {},
  stocks: [],
  stockLoading: 1,
  stockPurchasePrice: 0,
  stockAvgReturn: null,
  crypto: [],
  cryptoLoading: 1,
  cryptoPurchasePrice: 0,
  cryptoAvgReturn: null,
  bonds: [],
  bondLoading: 1,
  bondPurchasePrice: 0,
  bondAvgReturn: null,
  others: [],
  othersLoading: 1,
  othersPurchasePrice: 0,
  othersAvgReturn: null,
};

export const store = configureStore({
  reducer: userassetsreducer,
  preloadedState: initialState,
});
