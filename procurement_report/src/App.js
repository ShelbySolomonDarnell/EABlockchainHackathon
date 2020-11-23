import React, { useState } from "react";
import * as Yup from "yup";
import "./styles/index.css";
import AppContext from "./AppContext";
import moment from 'moment';
import Page1 from "./ui/Page1";
import Page2 from "./ui/Page2";
import Page3 from "./ui/Page3";
import Page4 from "./ui/Page4";
import axios from "axios";
import VibLogo from "./assets/images/vybeid-proreport-logo.png";
//import VibLogo from "./assets/images/ufaa-logo.png";

function App() {
  const [page, setPages] = useState(0);
  const registrationSchema = Yup.object().shape({
    businessType: Yup.string().required("Business type is required"),
    businessName: Yup.string()
      .min(2, "Business name is too short")
      .required("A business name is required"),
    businessHolder: Yup.string()
      .min(2, "Business holder's name is too short")
      .required("Registered business holder's name is required"),
    businessRegNumber: Yup.number().required(
      "Business registration number is required"
    ),
    businessCountry: Yup.string().required("Country is required"),
    businessRegion: Yup.string().required("County/Region is required"),
    businessPhone: Yup.string().required("Business phone number is required"),
    businessDescription: Yup.string()
      .min(4, "Business description is too short")
      .required("Business description is required"),
    individualRoleInBuisiness: Yup.string().required("Role iin the business is required"),
    individualFullName: Yup.string()
      .min("2", "Name is too short")
      .required("Name is required"),
    individualID: Yup.string()
      .min("4", "ID/Passport number is too short")
      .required("ID/Passport number is required"),
    individualEmail: Yup.string().email(),
    businessYearOfLaunch: Yup.date().max(moment().year()).required()
  });
  const [values, setValues] = useState({
    businessType: "Private Limited Company",
    businessCountry: "",
    businessRegion: "",
    businessName: "",
    businessHolder: "",
    businessRegNumber: 0,
    businessPhone: "",
    businessYearOfLaunch: "",
    businessDescription: "",
    individualRoleInBusiness: "Administrator/Manager",
    individualFullName: "",
    individualID: "",
    individualEmail: "",
    individualPhone: "",
    individualPassword: ""
  });
  const store = {
    values: { get: values, set: setValues }
  };
  const pages = [<Page1 />, <Page2 />, <Page3 />, <Page4 />];
  const nextPage = () => {
    setPages(page + 1);
  };
  const previousPage = () => {
    setPages(page - 1);
  };
  const onSubmit = e => {
    e.preventDefault();
    //registrationSchema.isValid(values).then(valid => console.log(valid));
    axios.post("http://18.157.58.115:3005/api/walletLogin",
        { params: {id: 'kweli-wallet', key: 'keytruth'}})
        .then(response => console.log(response.data))
        .catch(error => {
          console.error('Error ', error);
        });

    console.log(values);
  };
  return (
    <AppContext.Provider value={store}>
      <div className="bgGradient h-screen w-full flex flex-col lg:items-center lg:justify-center lg:p-0 p-4 ">
        <div className="lg:w-1/2 flex justify-end">
          <span className="tracking-wider text-jungle">{`Step ${page + 1} of ${
            pages.length
          }`}</span>
        </div>
        <div className="bg-white lg:w-6/12 rounded-md shadow-2xl flex flex-col relative h-full lg:height-80">
          <div className="w-full flex justify-center">
            <img
              className="object-contain w-7/12"
              src={VibLogo}
              alt="Vibrainum ID Logo"
            />
          </div>
          <div className="w-full">
            <form>
              <div className="flex flex-col">
                {pages[page]}
                {page === pages.length - 1 ? (
                  <div className="flex w-full justify-center py-6 text-lg outline-none absolute bottom-0">
                    <button
                      type="button"
                      className="mr-2 px-4 py-1 rounded-md text-jungle"
                      onClick={previousPage}
                    >
                      Go Back
                    </button>
                    <button
                      type="submit"
                      className="bg-primary px-4 py-1 rounded-md text-white outline-none"
                      onClick={onSubmit}
                    >
                      Verify ID and Submit Report
                    </button>
                  </div>
                ) : (
                  <div className="flex w-full justify-center py-6 text-lg absolute bottom-0 outline-none">
                    {page + 1 === 1 ? (
                      <button
                        type="button"
                        className="bg-primary px-4 py-1 rounded-md text-white"
                        onClick={() => {
                          nextPage();
                          console.log(values);
                        }}
                      >
                        Continue
                      </button>
                    ) : (
                      <div className="flex w-full justify-center py-6 text-lg outline-none absolute bottom-0">
                        <button
                          type="button"
                          className="mr-2 px-4 py-1 rounded-md text-jungle outline-none"
                          onClick={previousPage}
                        >
                          Go Back
                        </button>
                        <button
                          type="button"
                          className="bg-primary px-4 py-1 rounded-md text-white outline-none"
                          onClick={() => {
                            nextPage();
                            console.log(values);
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center py-4">
          <span className="text-white text-lg tracking-wider">
            Have an account?{" "}
            
            {/* http://localhost:3005 */} 
            <a className="text-jungle" href="http://localhost:3005" target="_blank">
              Login
            </a>
          </span>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
