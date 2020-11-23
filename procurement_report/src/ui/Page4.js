import React, { useContext } from "react";
import CustomInput from "./customInput";
import PhoneInput from "react-phone-input-2";
import AppContext from "../AppContext";
import "react-phone-input-2/lib/style.css";
import "../styles/index.css";

function Page4() {
  // const onClick = (e)=> {
  //   e.preventDefault();
  //   console.log(context.values.get);
  // }
  const context = useContext(AppContext);
  return (
    <div className="flex flex-col px-4 lg:px-24">
      <span className="text-lg lg:text-xl">Register Your Info</span>
      <div className="py-2">
        <CustomInput
          type="text"
          name="individualFullName"
          placeholder="Full Name"
        />
      </div>
      <div className="py-2">
        <CustomInput
          type="text"
          name="individualID"
          placeholder="Vibranium ID no (Wallet Name)"
        />
      </div>
      {/*
      <div className="py-2">
        <CustomInput
          type="email"
          name="individualEmail"
          placeholder="Email(Optional)"
        />
      </div>
      */}
      <div className="py-2">
        <CustomInput
          type="password"
          name="individualPassword"
          placeholder="Password"
        />
      </div>
      <div className="py-2">
        <PhoneInput
          country="ke"
          regions="africa"
          value={context.values.get.individualPhone || ""}
          onChange={phoneNumber =>
            context.values.set({
              ...context.values.get,
              individualPhone: phoneNumber
            })
          }
        />
      </div>
      <div className="py-2">
        <span>Disclaimer: None of your personal information will be openly displayed in the system. Your ID information must be entered for KYC (verifying the trustworthiness of the claimant).</span>
      </div>
      {/* <div className="py-2">
        <button onClick={onClick}>Get Values</button>
      </div> */}
    </div>
  );
}

export default Page4;
