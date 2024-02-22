import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Brand from "../components/Brand";
import Navbar from "../components/Navbar";

function Home() {
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://faculty-recruit-server-vcgo.onrender.com/job");
        setJobData(response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Brand />
      </div>

      <div>
        <Navbar />
      </div>

      <div className="m-4 p-4">
        <div className="font-sawarabi text-4xl">Current Openings</div>

        <div className="m-5">
          {getJobData(jobData)}
        </div>
      </div>
    </div>
  );
}

const getJobData = (data) => {
  if(data.length === 0) {
    return (<div className="p-3 font-garamond text-3xl text-center">No Openings</div>)
  }else {
  return data.map((item, index) => (
    <div className="p-3 font-garamond text-[18px]" key={index}>
      <div className="text-3xl">{item.title}</div>

      <div className="flex">
        <div className="flex-grow font-semibold m-2">
          Department: {item.department}
        </div>

        <div className="m-2 flex-grow">
          <div className="flex-grow font-semibold">
            Advertised: <code className="code">{item.advertised}</code>
          </div>

          <div className="flex-grow font-semibold">
            Deadline: <code className="code">{item.deadline}</code>
          </div>
        </div>
      </div>

      <div>
        <div>{item.summary}</div>
      </div>

      <div className="mt-3">
        <Link className="no-underline bg-red-700 bordar rounded p-2 mx-2 text-white"
            to={`https://faculty-recruit-server-vcgo.onrender.com/pdfs/${item.id}`}>Job Details</Link>

        <Link className="no-underline bg-red-900 bordar rounded p-2 mx-2 text-white"
              to={`/job/apply/${item.id}`}>Apply</Link>
      </div>
    </div>
  ));
  }
};

export default Home;
