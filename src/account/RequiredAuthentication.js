import React from "react";
import {useAuth} from "./Authentication";
import {Navigate} from "react-router";

function RequiredAuthentication({children}) {
  let auth = useAuth();

  console.log(auth.user);
  if(!auth.user) {
    return <Navigate to='/login' />
  }

  return children;
}

export {RequiredAuthentication};