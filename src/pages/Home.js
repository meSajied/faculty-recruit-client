import React from "react";

import Brand from "../components/Brand";
import Navbar from "../components/Navbar";
import data from "../job.json"

function Home() {
  return (
      <div>
        <div>
          <Brand/>
        </div>

        <div>
          <Navbar/>
        </div>

        <div className="m-4 p-4">
          <div className="font-sawarabi text-4xl">
            Current Openings
          </div>

          <div className="m-5">
            {getJobData(data)}
          </div>
        </div>
      </div>
  )
}

const getJobData = (data) => {
  return data.map((item) => (
      <div className="p-3 font-garamond">
        <div className="text-3xl">
          {item.title}
        </div>

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
          {item.description}
        </div>
      </div>
  ));
};

export default Home;