import React, {useState} from "react";

import axios from "axios";
import {useAuth} from "./Authentication";
import {Navigate} from "react-router";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const {login, isLoggedIn} = useAuth();

  if(isLoggedIn) {
    return (
        <Navigate to='/' />
    )
  }

  return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          {showWarning && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex">
                <p>Login failed. Please check your credentials and try again.</p>
                <span
                    className="float-right cursor-pointer"
                    onClick={() => setShowWarning(false)}
                >
              &times;
            </span>
              </div>
          )}
        <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor='email' className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input type='email' name='email' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   onChange={(e) => setEmail(e.target.value)}
                   required
            />
          </div>

          <div className="mb-4">
            <label htmlFor='password' className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input type='password' name='password' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   onChange={(e) => setPassword(e.target.value)}
                   required
            />
          </div>

          <div className="flex items-center justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Login
            </button>
          </div>
        </form>
        </div>
      </div>
  )

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await axios.post('http://localhost:4414/account/applicant/login', {
        email: email,
        password: password
      })
          .then(res => {
            if(res.data?.email && res.data?.id){
              login(res.data);
            } else {
              setShowWarning(true);
            }
          });
    }catch(e) {
      console.log(e);
      setShowWarning(true);
    }
  }
};
export default Login;