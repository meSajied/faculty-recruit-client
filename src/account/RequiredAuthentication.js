import React from "react";
import {useAuth} from "./Authentication";
import {Navigate} from "react-router";

function RequiredAuthentication({children}) {
  let loggedIn = useAuth().user;

  return(
      loggedIn ? {children}: <Navigate to='login' />
  )
}

export {RequiredAuthentication};