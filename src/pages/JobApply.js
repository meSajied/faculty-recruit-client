import React, {useState, useRef} from "react";
import {useParams} from "react-router";
import axios from "axios";
import {v4} from "uuid";
import { useAuth } from "../account/Authentication";

function JobApply() {
  const mcirRef = useRef();
  const transcriptRef = useRef();
  const nationalIdRef = useRef();
  const photoRef = useRef();

  const {jobId} = useParams();
  const {user} = useAuth();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const [formData, setFormData] = useState({
    id: v4(),
    jobId: jobId,
    applicantId: user.id
  });

  function handleChange(e) {
    const {name, files} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0],
      
    }))
  }

  return (
      <div>
       <div className="flex items-center justify-center">
          <div className="flex flex-col items-center">
            {showSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex">
                  <p>Application created</p>
                  <span
                      className="ml-auto cursor-pointer"
                      onClick={() => setShowSuccess(false)}
                  >
              &times;
            </span>
                </div>
            ) : showFailure ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex">
                      <p>Could not create application</p>
                      <span
                          className="ml-auto cursor-pointer"
                          onClick={() => setShowFailure(false)}
                      >
              &times;
            </span>
                    </div>
                ): null}

            <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div>
              <input
                  type="hidden"
                  name="id"
                  value={formData.id}
                  required
              />
            </div>

            <div>
              <input
                  type="hidden"
                  name="jobId"
                  value={formData.jobId}
                  required
              />
            </div>

            <div>
              <input
                  type="hidden"
                  name="applicantId"
                  value={formData.applicantId}
                  required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="photo">Choose Photo:</label>
              <input
                  type="file"
                  name="photo"
                  ref={photoRef}
                  value={formData.p}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onChange={handleChange}
                  required
              />
              </div>

              <div className="mb-4">
              <label htmlFor="transcript">Choose Transcript:</label>
              <input
                  type="file"
                  name="transcript"
                  ref={transcriptRef}
                  accept=".pdf"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onChange={handleChange}
                  required
              />
            </div>

            <div className="mb-4">
              <div>
              <label htmlFor="nationalId">Choose National ID/Birth Certificate:</label>
              </div>
              <div>
              <input
                  type="file"
                  name="nationalId"
                  ref={nationalIdRef}
                  accept=".pdf"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onChange={handleChange}
                  required
              />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="mcir">Choose MCIR:</label>
              <input
                  type="file"
                  name="mcir"
                  ref={mcirRef}
                  accept=".pdf"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onChange={handleChange}
                  required
              />
            </div>

            <div className="mb-6">
              <div className="flex">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
                <div className="mx-4"></div>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={clearData} >Clear Form</button>
              </div>
            </div>
          </form>
          </div>
        </div>
      </div>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    
    try {
      await axios.post('https://faculty-recruit-server-vcgo.onrender.com/applicant/apply-for-job', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res.data?.msg);
        res.data?.msg === "OK"? setShowSuccess(true) : setShowFailure(true);
      })
      clearData();
    }catch(e) {
      console.log(e);
      setShowFailure(true);
      clearData();
    }
  }

  function clearData() {
    setFormData({
      id: v4(),
      jobId: jobId,
      applicantId: user.id,
    });

    mcirRef.current.value = "";
    transcriptRef.current.value = "";
    nationalIdRef.current.value = "";
    photoRef.current.value = "";
  }
}

export default JobApply;