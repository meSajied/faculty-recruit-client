import React, {useState} from "react";
import axios from "axios";

import {useAuth} from "../account/Authentication";

const ChangePassword = () => {
  const {user: {id}} = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const [formData, setFormData] = useState({
    id: id,
    oldPassword: "",
    newPassword: ""
  });

  function handleChange(e) {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
      <div>
       <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            {showSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex">
                  <p>Password changed.</p>
                  <span
                      className="ml-auto cursor-pointer"
                      onClick={() => setShowSuccess(false)}
                  >
              &times;
            </span>
                </div>
            ) : showFailure ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex">
                  <p>Could not change password.</p>
                  <span
                      className="ml-auto cursor-pointer"
                      onClick={() => setShowFailure(false)}
                  >
              &times;
            </span>
                </div>
            ): null}

            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div>
              <input
                  type="hidden"
                  name="id"
                  value={formData.id}
                  required
              />
            </div>

            <div className="mb-4">
              <label htmlFor='old-password' className="block text-gray-700 text-sm font-bold mb-2">Old Password:</label>
              <input type='password' name='oldPassword'
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     value={formData.oldPassword}
                     onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label htmlFor='new-password' className="block text-gray-700 text-sm font-bold mb-2">New Password:</label>
              <input type='password' name='newPassword'
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     value={formData.newPassword}
                     onChange={handleChange} />
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
            </div>
          </form>
          </div>
        </div>
      </div>
  );

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post('http://localhost:4414/applicant/change-password', formData, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        res.data.msg === "OK" ? setShowSuccess(true) : setShowFailure(true)
      })
    }catch(e) {
      console.log(e);
      setShowFailure(true);
    }
  }
}

export {ChangePassword};