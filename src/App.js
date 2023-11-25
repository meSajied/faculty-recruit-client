import React from "react";
import {BrowserRouter, Route, Routes}
    from "react-router-dom";

import Home from "./pages/Home";
import Login from "./account/Login";
import ErrorPage from "./pages/ErrorPage";
import {AuthProvider} from "./account/Authentication";
import {RequiredAuthentication} from "./account/RequiredAuthentication";
import Dashboard from "./pages/Dashboard";

function App() {
  return(
     <AuthProvider>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<RequiredAuthentication
              children={Dashboard} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>

      </BrowserRouter>
      </AuthProvider>
  )
}

export default App;