import React from "react";
import {BrowserRouter, Route, Routes}
    from "react-router-dom";

import Home from "./pages/Home";
import Login from "./account/Login";
import Signup from "./account/Signup";
import ErrorPage from "./pages/ErrorPage";
import {AuthProvider} from "./account/Authentication";
import {RequiredAuthentication} from "./account/RequiredAuthentication";
import {Profile} from "./pages/Profile";
import JobApply from "./pages/JobApply";
import { ChangePassword } from "./pages/ChangePassword";
import {Applications} from "./pages/Applications";
import {Logout} from "./account/Logout"
import { DeleteAccount } from "./pages/DeleteAccount";

function App() {
  return(
     <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<RequiredAuthentication children={<Profile />} />} />
          <Route path="change-password" element={<RequiredAuthentication children={<ChangePassword />} />} />
          <Route path="applications" element={<RequiredAuthentication children={<Applications />} />} />
          <Route path="logout" element={<RequiredAuthentication children={<Logout />} />} />
          <Route path="delete-account" element={<RequiredAuthentication children={<DeleteAccount />} />} />
          <Route path="job/apply/:jobId" element={<RequiredAuthentication children={<JobApply />} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
  )
}

export default App;