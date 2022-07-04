import React from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./AppRoutes";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";

const root = createRoot(document.getElementById("root"));
// Provider is used to tell the react app that we have a global state.

root.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>
);