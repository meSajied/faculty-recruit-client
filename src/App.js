import React from "react";
import {BrowserRouter, Route, Routes}
    from "react-router-dom";

import Home from "./pages/Home";
import Login from "./account/Login";
import Signup from "./account/Signup";
import ErrorPage from "./pages/ErrorPage";
import {AuthProvider} from "./account/Authentication";
import {RequiredAuthentication} from "./account/RequiredAuthentication";
import Dashboard from "./account/Dashboard";
import JobApply from "./pages/JobApply";


function App() {
  return(
     <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<RequiredAuthentication children={<Dashboard />} />} />
          <Route path="job/apply" element={<RequiredAuthentication children={JobApply} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
  )
}

export default App;