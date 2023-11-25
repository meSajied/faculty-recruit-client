import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
  return(
      <nav className="m-5 flex justify-end">
        <Link to="login" className="font-sawarabi
            font-bold text-2xl text-black
            no-underline">
            Login
        </Link>
      </nav>
  )
}

export default Navbar;