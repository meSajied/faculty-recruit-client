import React from "react";
import {Link} from "react-router-dom";

function Brand() {
  return(
      <div className="font-sawarabi">
        <div className="bg-sust-wall flex
            justify-center items-center">

          <Link className="p-3 text-3xl text-white no-underline"
              to="https://www.sust.edu/">
            Shahjalal University of Science and Technology
          </Link>
        </div>

        <div className="bg-red-700 flex justify-center items-center">
          <div className="p-8 text-5xl text-white">
            Faculty Positions
          </div>
        </div>
      </div>
  )
}

export default Brand;