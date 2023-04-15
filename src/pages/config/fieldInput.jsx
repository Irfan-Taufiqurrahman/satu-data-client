import React from "react";
import { Field } from "formik";

const FieldInput = ({ label, name, mandatory = false, type, error }) => {
  // console.log(error);
  return (
    <div className="">
      <label
        htmlFor={name}
        className={`block mb-2 text-sm font-medium ${
          error ? "text-red-700" : "text-gray-900"
        } `}
      >
        {label} {mandatory ? <span className="text-red-700">*</span> : ""}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={label}
        className={`${
          error
            ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
        }  border-2  text-sm rounded-lg   block w-full p-2.5 outline-none`}
      />
      {error && <p className="mt-2 text-sm text-red-600 ">{error}.</p>}
    </div>
  );
};

export default FieldInput;