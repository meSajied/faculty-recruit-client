import React from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../account/Authentication";

const Navbar = () => {
  const auth = useAuth()
  const user1 = {
    name: "Sajied",
    email: "sajied@you.com"
  }
  useAuth().login(user1);

  return(
      <nav className="m-5 flex justify-end">
        <div className="font-sawarabi
            font-bold text-black">
        {auth.user ? UserDashboard(auth.user.name) : LoginAndSignUp()}
        </div>
      </nav>
  )
}

function UserDashboard(username) {
  const navigate = useNavigate();
  return(
      <div className="space-x-5">
        <button className="font-sawarabi text-2xl"
                onClick={()=> {navigate("/dashboard")}}>
          {username}
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