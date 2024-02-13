import React from "react";
import {Navigate} from "react-router";
import {useAuth} from "./Authentication";

const Logout = () => {
  const {logout} = useAuth();
  logout();

  return(
      <Navigate to='/login' />
  );
}

export {Logout};