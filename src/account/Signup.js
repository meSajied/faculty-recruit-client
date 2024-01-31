import React from "react";
import {v4} from "uuid";
import axios from "axios";

import {useAuth} from "./Authentication";
import {Navigate, useNavigate} from "react-router";

const Signup = () => {
  const {isLoggedIn, login} = useAuth();
  const navigate = useNavigate();

  if(isLoggedIn) {
    return (
        <Navigate to='/' />
    )
  }

  return (
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div>
            <input type='hidden' name='id' value={v4()}
            required/>
          </div>

          <div className="mb-4">
            <label htmlFor='firstName' className="block text-gray-700 text-sm font-bold mb-2">
              First Name:
            </label>
            <input type='text' name='firstName' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   onChange={e => e.target.value}
                   required
            />
          </div>

          <div className="mb-4">
            <label htmlFor='lastName' className="block text-gray-700 text-sm font-bold mb-2">
              Last Name:
            </label>
            <input type='text' name='lastName' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   onChange={e => e.target.value}
                   required
            />
          </div>

          <div className="mb-4">
            <label htmlFor='email' className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input type='email' name='email' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   onChange={e => e.target.value}
                   required
            />
          </div>

          <div className="mb-4">
            <label htmlFor='password' className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input type='password' name='password' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   onChange={e => e.target.value}
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
  )

  async function handleLogin(e) {
    await axios.post('http://localhost:4414/account/applicant/signup', new FormData(e.currentTarget), {
      headers: {
        "Content-Type": "application/json"
      }
    })
        .then(res => {
          if(res.data?.email && res.data?.id) {
            login(res.data);
          } else {
            navigate('/login');
          }
        });
  }
};

export default Signup;