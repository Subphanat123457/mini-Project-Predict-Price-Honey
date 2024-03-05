// import React from 'react'
import Table from "../components/Table";
import { Code } from "@nextui-org/react";
import Popover from "../components/popover";
import Madal from "../components/modal";
import Madal_import from "../components/modal_import";

function dashbord() {

  return (
      <div className="items-center justify-center">
        <h1 className="items-center justify-center pt-20 text-4xl font-bold">
          Machine Learning Prediction
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h1 className="pt-20 text-2xl font-bold">Examples of data</h1>
            <h2 className="text-lg font-semibold">
             Examples of data used to make predictions using machine learning.
            </h2>
            <h3 className="text-base font-medium pt-2">
              <a href="https://drive.google.com/file/d/1EaoHzvkm7SvF_aW5-U_Zc3GRhLbeIF44/view?usp=sharing"><Code>Dowload Dataset</Code> </a>
            </h3>
          </div>
          <div className="flex justify-end items-end gap-2">
            <Popover />
            <Madal />
            <Madal_import />
          </div>
        </div>
        <div className="pt-10">
          <Table />
        </div>
      </div>
  );
}
export default dashbord;
