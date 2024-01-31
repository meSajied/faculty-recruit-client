import React from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../account/Authentication";

const Navbar = () => {
  const {isLoggedIn, user} = useAuth();

  return(
      <nav className="m-5 flex justify-end">
        <div className="font-sawarabi
            font-bold text-black">
        {isLoggedIn ? UserDashboard(user.firstName) : LoginAndSignUp()}
        </div>
      </nav>
  )
}

function UserDashboard(name) {
  const navigate = useNavigate();
  return(
      <div className="space-x-5">
        <button className="font-sawarabi text-2xl"
                onClick={()=> {navigate("/dashboard")}}>
          {name}
        </button>
      </div>
  );
}

function LoginAndSignUp() {
  const navigate = useNavigate();

  return(
      <div className="space-x-5">
        <button className="font-sawarabi text-2xl"
            onClick={()=> {navigate("/signup")}}>
          Sign up
        </button>

        <button className=" font-sawarabi text-2xl"
            onClick={()=> {navigate("/login")}}>
          Login
        </button>
      </div>
  );
}

export default Navbar;