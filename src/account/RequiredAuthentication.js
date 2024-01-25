import React from "react";
import {useAuth} from "./Authentication";
import {Navigate} from "react-router";

function RequiredAuthentication({children}) {
  const {isLoggedIn} = useAuth();

  return(
      isLoggedIn ? children : <Navigate to='/login' />
  )
}

export {RequiredAuthentication};