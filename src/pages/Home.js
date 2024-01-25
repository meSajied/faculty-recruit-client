import React from "react";

import Brand from "../components/Brand";
import Navbar from "../components/Navbar";
import data from "../job.json";

function Home() {
  return(
      <div>
        <div>
        <Brand />
        </div>

        <div>
          <Navbar />
        </div>

        <div className="m-4 p-4">
          <div className="font-sawarabi text-4xl">
            Current Openings
          </div>

          <div className="m-5">
            {getJsonData(data)}
          </div>
        </div>
      </div>
  )
}

const getJsonData = (data) => {
  return data.map((item, index) => (
      <div className="p-3 font-garamond" key={index}>
        <div className="text-3xl">
          {item.title}
        </div>

        <div className="flex">
          <div className="flex-grow font-semibold m-2">
            Department: {item.department}
          </div>

          <div className="m-2 flex-grow">
            <div className="flex-grow font-semibold">
              Advertised: <code className="code">{item.opens}</code>
            </div>

            <div className="flex-grow font-semibold">
              Deadline: <code className="code">{item.closes}</code>
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