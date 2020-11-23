import React, {useContext } from "react";
import "../styles/index.css";
import AppContext from "../AppContext";
import { RadioGroup, Radio } from "react-radio-group";

function Page1() {
  const handleChange = value => {
    context.values.set({ ...context.values.get, businessType: value });
  };
  const context = useContext(AppContext);
  return (
    <div className="flex flex-col px-6 py-6 lg:px-24">
      <span className="text-lg lg:text-xl py-2">
        Which open tender are you reporting on?
        {/* Which type of Holder Institute are you:  */}
      </span>
      <RadioGroup
        name="businessType"
        selectedValue={context.values.get.businessType}
        onChange={handleChange}
      >
        <div className="py-1">
          <Radio value="Tender 1 UFAA Security Improvement"/>
          <span className="px-1 text-base lg:text-lg">
            Tender 1 -- Unclaimed Financial Asset Authority Security Improvement
            {/* Private Limited Company */}
          </span>
        </div>
        <div className="py-1">
          <Radio value="Tender 2 NHIF DA Platform" />
          <span className="px-1 text-base lg:text-lg">
            Tender 2 -- NHIF Data Analytics Platform
            {/*Public Limited Company */}
          </span>
        </div>
        <div className="py-1">
          {/* <Radio value="Sole Proprietorship" /> */}
          <Radio value="Tender 3 KeNHA/2337/2020 https://kenha.co.ke/Downloads/Tenders/2020/ALC/2337_Virtual_Stations_Notice.pdf"/>
          <span className="px-1 text-base lg:text-lg">
            Tender 3 -- National Highways Authority KeNHA/2337/2020
            {/* Sole Proprietorship */}
          </span>
        </div>
        {/*
        <div className="py-1">
          <Radio value="Partnership" />
          <span className="px-1 text-base lg:text-lg">Partnership</span>
        </div>
        <div className="py-1">
          <Radio value="Not for Profit" />
          <span className="px-1 text-base lg:text-lg">Not for Profit</span>
        </div>
        */}
      </RadioGroup>
    </div>
  );
}

export default Page1;
