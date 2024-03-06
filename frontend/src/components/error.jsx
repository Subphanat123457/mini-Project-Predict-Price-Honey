import React from "react";


const Error = () => {
  return (
    <div className="grid items-center justify-center">
      <h1 className="grid items-center justify-center text-4xl font-bold">
        Can not connect to the server please try again later
      </h1>
      <div className="grid items-center justify-center">
        <img
          width={300}
          height={200}
          alt="NextUI hero Image with delay"
          src="https://png.pngtree.com/png-clipart/20230916/original/pngtree-cloud-illustration-of-a-server-building-vector-png-image_12227710.png"
        />
          
      </div>
      <h1 className="grid items-center justify-center text-2xl font-bold">
            500 Internal Server Error. Please try again later, or contact the system administrator
        </h1>
    </div>
  );
};

export default Error;
