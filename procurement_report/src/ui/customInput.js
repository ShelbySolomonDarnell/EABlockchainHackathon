import React, { useContext } from "react";
import AppContext from "../AppContext";
import "../styles/index.css";

const CustomInput = props => {
  const { name, type, placeholder } = props;
  const context = useContext(AppContext);
  const handleChange = e => {
    context.values.set({ ...context.values.get, [name]: e.target.value });
  };
  return (
    <div className="w-full">
      <input
        className="text-primary px-2 lg:text-lg py-3 border-2 border-secondary rounded-lg w-full outline-none placeholder-primary"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={context.values.get[name] || ""}
      />
    </div>
  );
};

export default CustomInput;
