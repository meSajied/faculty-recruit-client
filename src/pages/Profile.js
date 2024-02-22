import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../account/Authentication";

const Profile = () => {
  const {user: {id}} = useAuth();

  const [fetchError, setFetchError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateFailure, setUpdateFailure] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    fathersName: "",
    mothersName: "",
    spouseName: "",
    birthDate: "",
    maritalStatus: "",
    nationalIdNumber: "",
    currentAddress: "",
    mobile: "",
    email: "",
    permanentAddress: "",
    country: "",
    nationality: "",
    religion: "",
  });

  const updateFormData = useCallback((data) => {
    setFormData({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      fathersName: data.fathersName,
      mothersName: data.mothersName,
      spouseName: data.spouseName,
      birthDate: data.birthDate,
      maritalStatus: data.maritalStatus,
      nationalIdNumber: data.nationalIdNumber,
      currentAddress: data.currentAddress,
      mobile: data.mobile,
      email: data.email,
      permanentAddress: data.permanentAddress,
      country: data.country,
      nationality: data.nationality,
      religion: data.religion,
    })
  }, [])

  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await axios.get("https://faculty-recruit-server-vcgo.onrender.com/applicant/fetch-details", {
          params: {
            id: id
          },
          headers: {
            "Content-Type": "application/json"
          }
        })
        
        if(res.data?.id) {
          updateFormData(res.data);
        }
      }catch(e) {
        setFetchError(true);
        console.log(e);
      }
    }

    fetchData();
    
  }, [id, updateFormData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

   try {
      await axios.post("https://faculty-recruit-server-vcgo.onrender.com/applicant/update-profile", formData).then((r) => {
        if(r.data?.msg === "OK") {
          setUpdateSuccess(true);
        }
      })
    }catch(e) {
      setUpdateFailure(true);
      console.log(e);
    }
  };

  return (
      <div className="max-w-md mx-auto mt-8">
        <div className="flex flex-col items-center">
            {updateSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex">
                  <p>Profile updated.</p>
                  <span
                      className="ml-auto cursor-pointer"
                      onClick={() => setUpdateSuccess(false)}
                  >
              &times;
            </span>
                </div>
            ) : updateFailure ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex">
                  <p>Could not update profile.</p>
                  <span
                      className="ml-auto cursor-pointer"
                      onClick={() => setUpdateFailure(false)}
                  >
              &times;
            </span>
                </div>
            ): fetchError ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex">
                  <p>Could not fetch data.</p>
                  <span
                      className="ml-auto cursor-pointer"
                      onClick={() => setFetchError(false)}
                  >
              &times;
            </span>
                </div>
            ): null}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
                type="text"
                name="name"
                value={formData.firstName + " " + formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Father's Name:</label>
            <input
                type="text"
                name="fathersName"
                value={formData.fathersName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Mother's Name:</label>
            <input
                type="text"
                name="mothersName"
                value={formData.mothersName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Spouse's Name:</label>
            <input
                type="text"
                name="spouseName"
                value={formData.spouseName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-x-2"></div>

            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Mobile No.:</label>
              <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Marital Status:</label>
              <input
                  type="text"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-x-2"></div>

            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Birth Date:</label>
              <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">National ID:</label>
            <input
                type="text"
                name="nationalIdNumber"
                value={formData.nationalIdNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Country:</label>
            <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nationality:</label>
            <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Religion:</label>
            <input
                type="text"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Current Address:</label>
            <input
                type="text"
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Permanent Address:</label>
            <input
                type="text"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="flex justify-end">
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Update
            </button>
          </div>
        </form>
        </div>
      </div>
  );
};

export { Profile };
