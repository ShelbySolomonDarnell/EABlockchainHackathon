import React, { useContext } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
//import PhoneInput from "react-phone-input-2";
import AppContext from "../AppContext";
import "react-phone-input-2/lib/style.css";

import CustomInput from "./customInput";
import "../styles/index.css";

function Page2() {
  const context = useContext(AppContext);
  const africanCountries = [
    "DZ",
    "AO",
    "BJ",
    "BW",
    "BF",
    "BI",
    "CM",
    "CV",
    "CF",
    "TD",
    "KM",
    "CG",
    "CD",
    "CI",
    "DJ",
    "EG",
    "GQ",
    "ER",
    "ET",
    "GA",
    "GM",
    "GH",
    "GN",
    "GW",
    "KE",
    "LS",
    "LR",
    "LY",
    "MG",
    "MW",
    "ML",
    "MR",
    "MU",
    "YT",
    "MA",
    "MZ",
    "NA",
    "NE",
    "NG",
    "RE",
    "RW",
    "SH",
    "ST",
    "SN",
    "SC",
    "SL",
    "SO",
    "ZA",
    "SS",
    "SD",
    "SZ",
    "TZ",
    "TG",
    "TN",
    "UG",
    "EH",
    "ZM",
    "ZW"
  ];

  return (
    <div className="flex flex-col px-4 lg:px-24 w-full">
      <center>
        <strong>
        <span className="px-1 text-base lg:px-30 w-full">
          <p stype={{whitespace: 'post'}}>
            {context.values.get.businessType}
          </p>
        </span>
        </strong>
      </center>
      <br/>
      <br/>
      <span className="text-lg lg:text-xl"><strong>Contractor Information</strong></span>
      <span className="text-lg lg:text-xl">Fill out what you can</span>
      <div className="py-2">
        <CountryDropdown
          value={context.values.get.businessCountry}
          whitelist={africanCountries}
          onChange={val =>
            context.values.set({
              ...context.values.get,
              businessCountry: val
            })
          }
          classes="w-full border-2 border-secondary px-1 lg:px-2 text-base lg:text-lg py-1 lg:py-3 text-primary appearance-none bg-white outline-none rounded-lg"
        />
      </div>
      <div className="py-2">
        <RegionDropdown
          country={context.values.get.businessCountry}
          value={context.values.get.businessRegion}
          onChange={val =>
            context.values.set({
              ...context.values.get,
              businessRegion: val
            })
          }
          classes="w-full border-2 border-secondary px-1 lg:px-2 text-base lg:text-lg py-1 lg:py-3 text-primary appearance-none bg-white outline-none rounded-lg"
        />
      </div>
      <div className="py-2">
        <CustomInput
          type="text"
          name="businessName"
          placeholder="Registered Procuring Entity"
        />
      </div>
      <div className="py-2">
        <CustomInput
          type="text"
          name="businessHolder"
          placeholder="Persons Being Reported (Separate with semicolon)"
        />
      </div>
      {/*
      <div className="py-2">
        <CustomInput
          type="number"
          name="businessRegNumber"
          placeholder="Registered Business Number"
        />
      </div>
      <div className="py-2">
        <PhoneInput
          country="ke"
          regions="africa"
          value={context.values.get.businessPhone || ""}
          onChange={phoneNumber =>
            context.values.set({ ...context.values.get, businessPhone: phoneNumber })
          }
        />
      </div>
      */}
    </div>
  );
}

export default Page2;
