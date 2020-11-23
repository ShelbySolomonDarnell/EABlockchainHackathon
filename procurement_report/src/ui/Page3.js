import React, { useContext } from "react";
//import { RadioGroup, Radio } from "react-radio-group";
import AppContext from "../AppContext";
import "react-datetime/css/react-datetime.css";
import "../styles/index.css";
import CustomInput from "./customInput";
let Datetime = require('react-datetime')
// let moment = require('moment');

function Page3() {
  const context = useContext(AppContext);
  return (
    <div className="px-4 lg:px-24 flex flex-col">
      <span className="text-lg lg:text-xl">
        Evaluation Form for {context.values.get.businessType}
      </span>
      <div className="w-full py-2">
        <CustomInput placeholder="Title" />
      </div>
      <div className="py-2">
        <select
          name="evaluation"
          className="w-full p-2 border-2 border-graw-800">
          <option value="none">Please select ----</option>
          <option value="update">Status Update</option>
          <option value="emergency">Report Emergency</option>
          <option value="incident">Report Other Incident</option>
        </select>
      </div>
      <div className="py-2">
        <Datetime
          inputProps={{
            //placeholder: "Year of Launch 🗓",
            placeholder: "Observation Date",
            className:
              "py-3 px-2 rounded-lg border-secondary lg:text-lg text-primary border-2 w-full outline-none placeholder-primary appearance-none"
          }}
          closeOnSelect={true}
          dateFormat="YYYY-MM-DD"
          values={context.values.get.businessYearOfLaunch || ""}
          onChange={date => {
            context.values.set({
              ...context.values.get,
              businessYearOfLaunch: date.year()
            });
          }}
        />
      </div>
      <div className="py-2">
        <textarea
          className="px-2 placeholder-primary w-full py-3 border-2 border-secondary rounded-lg lg:text-lg text-primary resize-none outline-none"
          rows="3"
          name="businessDescription"
          //placeholder="Briefly describe your business"
          placeholder="Briefly describe the issue"
          value={context.values.get.businessDescription || ""}
          onChange={e => {
            context.values.set({
              ...context.values.get,
              businessDescription: e.target.value
            });
          }}
        />
      </div>

      <div className="w-full py-2">
        <CustomInput placeholder="Proof (Image)" />
      </div>

      {/*
      <span className="text-lg lg:text-xl">Role in the business</span>
      <RadioGroup
        name="individualRoleInBusiness"
        selectedValue={context.values.get.individualRoleInBusiness || ""}
        onChange={val =>
          context.values.set({
            ...context.values.get,
            individualRoleInBusiness: val
          })
        }
      >
      <button onClick={validYears}>Return Current</button> 
        <div>
          <Radio value="Administrator/Manager" />
          <span className="px-2 lg:text-lg">Administrator/Manager</span>
        </div>
        <div>
          <Radio value="Director" />
          <span className="px-2 lg:text-lg">Director</span>
        </div>
        <div>
          <Radio value="Owner" />
          <span className="px-2 lg:text-lg">Owner</span>
        </div>
        <div>
          <Radio value="Other" />
          <span className="px-2 lg:text-lg">Other</span>
        </div>
      </RadioGroup>
      */}
    </div>
  );
}

export default Page3;
