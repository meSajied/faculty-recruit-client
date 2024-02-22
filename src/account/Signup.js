import React, {useState} from "react";
import {v4} from "uuid";
import axios from "axios";

import {useAuth} from "./Authentication";
import {Navigate} from "react-router";

const Signup = () => {
  const {isLoggedIn, login} = useAuth();

  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    id: v4(),
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  if(isLoggedIn) {
    return (
        <Navigate to='/' />
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          {showWarning && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex">
                <p>Could not Sign up. You may have an account</p>
                <span
                    className="float-right cursor-pointer"
                    onClick={() => setShowWarning(false)}
                >
              &times;
            </span>
              </div>
          )}
        <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div>
            <input type='hidden' name='id' value={formData.id}
            required/>
          </div>

          <div className="mb-4">
            <label htmlFor='firstName' className="block text-gray-700 text-sm font-bold mb-2">
              First Name:
            </label>
            <input type='text' name='firstName' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.firstName}
                   onChange={handleChange}
                   required
            />
          </div>

          <div className="mb-4">
            <label htmlFor='lastName' className="block text-gray-700 text-sm font-bold mb-2">
              Last Name:
            </label>
            <input type='text' name='lastName' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.lastName}
                   onChange={handleChange}
                   required
            />
          </div>

          <div className="mb-4">
            <label htmlFor='email' className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input type='email' name='email' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.email}
                   onChange={handleChange}
                   required
            />
          </div>

          <div className="mb-4">
            <label htmlFor='password' className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input type='password' name='password' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.password}
                   onChange={handleChange}
                   required
            />
          </div>

          <div className="flex items-center justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign Up
            </button>
          </div>
        </form>
        </div>
      </div>
  )

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await axios.post('https://faculty-recruit-server-vcgo.onrender.com/applicant/signup', formData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
          .then(res => {
            if(res.data?.email && res.data?.id) {
              login(res.data);
            } else {
              setShowWarning(true);
            }

            clearData();
          });
    }catch(e) {
      console.log(e);
      clearData();
      setShowWarning(true);
    }
  }

  function clearData() {
    setFormData({
      id: v4(),
      firstName: "",
      lastName: "",
      email: "",
      password: "",
  });
  }
};

export default Signup;