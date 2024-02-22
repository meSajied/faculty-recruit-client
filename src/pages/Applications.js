import React, {useEffect, useState} from "react"
import {useAuth} from "../account/Authentication";
import axios from "axios";

const Applications = () => {
  const {user} = useAuth();

  const [application, setApplication] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://faculty-recruit-server-vcgo.onrender.com/applicant/applications", {id: user.id}, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        setApplication(response.data);
      } catch (error) {
        console.error("Error fetching application list:", error);
      }
    };

    fetchData();
  }, [user.id]);

  return (
      <div>
        {getApplications()}
      </div>
  )

  function getApplications() {
    if(application.length === 0) {
      return (<div className="p-3 font-garamond text-3xl text-center">No Job Application</div>)
    }else {
      return application.map((item, index) => (
          <div className="p-3 font-garamond text-[18px]" key={index}>
            <div className="text-3xl">{item.Job.title}</div>

            <div className="flex">
              <div className="flex-grow font-semibold m-2">
                Position: {item.Job.department}
              </div>

              <div className="flex-grow font-semibold m-2">
                Department: {item.Job.position}
              </div>

              <div className="m-2 flex-grow">
                <div className="flex-grow font-semibold">
                  STATUS: <code className="text-red-700">{item.status}</code>
                </div>
              </div>
            </div>
          </div>
      ));
    }
  }
}



export {Applications};