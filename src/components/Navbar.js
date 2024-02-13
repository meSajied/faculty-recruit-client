import React, {useState} from "react";
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

function UserDashboard(name) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return(
      <div className="space-x-5 relative">
        <button className="font-sawarabi text-2xl no-underline p-2 border rounded text-red-700" onClick={toggleDropdown}>
          {name}
        </button>
        {isDropdownOpen && (
            <div className="absolute mt-2 space-y-2 bg-white border rounded-md shadow-lg">
              <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-700">
                Profile
              </Link>
              <Link to="/change-password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-700">
                Change Password
              </Link>
              <Link to="/job-list" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-700">
                Job List
              </Link>
              <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-700">
                Logout
              </Link>
            </div>
        )}
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