import React from "react";
import Brand from "../components/Brand";

import data from "../job.json"

function Home() {
  return(
      <div>
        <div>
        <Brand />
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
  const jsonData = data.map((item, index) => (
      <div className="p-3 font-garamond" key={index}>
        <div className="text-3xl">
          {item.title}
        </div>

        <div className="flex flex-row">
          <div className="flex-grow font-semibold m-2">
            Department: {item.department}
          </div>

          <div className="m-2 flex-grow flex-col font-sans">
            <div className="flex-grow font-semibold">
              Advertised: <code className="font-hack font-normal">{item.opens}</code>
            </div>
            <div className="flex-grow font-semibold">
              Deadline: <code className="font-hack font-normal">{item.closes}</code>
            </div>
          </div>
        </div>

        <div>
          {item.description}
        </div>
      </div>
  ));
  return jsonData;
};

export default Home;