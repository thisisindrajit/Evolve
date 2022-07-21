//Documentation - https://reactrouter.com/web/guides/quick-start

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./landingPage";
import UserHome from "./Components/UserHome/UserHome";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Utils/NotFound";
import ProtectedRoute from "./Utils/ProtectedRoute";
import * as authservice from "./Services/Auth";
import { connect } from "react-redux";

const AppRoutes = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    authservice
      .verifyToken(
        localStorage.getItem("userID"),
        localStorage.getItem("username")
      )
      .then((res) => {
        isLoading(false);

        if (
          localStorage.getItem("access_token") &&
          localStorage.getItem("userID") &&
          localStorage.getItem("username") &&
          res
        ) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      });
  });

  const login = () => {
    setIsAuthenticated(true);
    // setting initial state
    props.setLoading({
      type: "setLoading",
      payload: {
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
      },
    });
  };

  const logout = () => {
    authservice.removelocalStorage();
    setIsAuthenticated(false);
  };

  const register = () => {
    localStorage.setItem("isNewEvolveUser", "yes");
    setIsAuthenticated(true);
    // setting initial state
    props.setLoading({
      type: "setLoading",
      payload: {
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
      },
    });
  };

  return (
    <BrowserRouter>
      <Switch>
        {/*Sending custom props to Login, Register, Home */}
        <Route
          exact
          path="/"
          render={(props) => (
            <LandingPage
              isAuthenticated={isAuthenticated}
              loading={loading}
              {...props}
            />
          )}
        />
        <Route
          path="/login"
          render={(props) => (
            <Login
              isAuthenticated={isAuthenticated}
              loading={loading}
              login={login}
              {...props}
            />
          )}
        />
        <Route
          path="/register"
          render={(props) => (
            <Register
              isAuthenticated={isAuthenticated}
              loading={loading}
              register={register}
              {...props}
            />
          )}
        />
        <ProtectedRoute
          path="/dashboard/:id"
          component={UserHome}
          isAuthenticated={isAuthenticated}
          logout={logout}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

// these are the functions which are required to map the state to the props and dispatch actions to store
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (loadingData) => dispatch(loadingData),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
