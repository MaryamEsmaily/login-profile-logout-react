import React from "react";
import { Redirect, Route } from "react-router";

function CustomRoutes({ isPrivate, redirect, ...props }) {
  const AUTH_TOKEN = localStorage.getItem("TOKEN");
  if ((isPrivate && !!AUTH_TOKEN) || (!isPrivate && !AUTH_TOKEN)) {
    return <Route {...props} />;
  }
  return <Redirect to={redirect} />;
}

export default CustomRoutes;
