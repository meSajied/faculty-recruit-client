import React from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../account/Authentication";

const Navbar = () => {
  const {isLoggedIn, user} = useAuth();

  return(
      <nav className="m-5 flex justify-end">
        <div className="font-sawarabi">
        {isLoggedIn ? UserDashboard(user.firstName) : LoginAndSignUp()}
        </div>
      </nav>
  )
}

function UserDashboard(name) {return(
      <div className="space-x-5">
        <Link className="font-sawarabi text-2xl no-underline p-2 border rounded text-red-700" to="/dashboard">
          {name}'s dashboard
        </Link>
      </div>
  );
}

function LoginAndSignUp() {
  return(
      <div className="space-x-5">
        <Link className="font-sawarabi text-[20px] no-underline bg-red-900 text-white p-2 border rounded" to="/signup">
          Sign up
        </Link>

        <Link className="font-sawarabi text-[20px] no-underline bg-red-900 text-white p-2 border rounded" to="/login">
          Login
        </Link>
      </div>
  );
}

export default Navbar;