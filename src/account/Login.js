import React, {useState} from "react";

import axios from "axios";
import {useAuth} from "./Authentication";
import {Navigate, useNavigate} from "react-router";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const {login, isLoggedIn} = useAuth();

  if(isLoggedIn) {
    return (
        <Navigate to='/' />
    )
  }

  return (
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor='text' className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input type='text' name='username' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   onChange={(e) => setUsername(e.target.value)}
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
  )

  async function handleLogin() {
    await axios.get('http://localhost:4414/account/administration/login',
        {
          params: {
            username: username,
            password: password
          }
        })
        .then(res => {
          if(res.data?.userName && res.data?.id){
            login(res.data);
          } else {
            navigate('/');
            alert(res.data);
          }
        });
  }
};

export default Login;