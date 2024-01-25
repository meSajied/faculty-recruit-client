import React from "react";
import {useAuth} from "./Authentication";

const Dashboard = () => {
  const auth = useAuth()
  return(
      <>
        <h1>dashboard</h1>
      </>
  )

}

export default Dashboard;