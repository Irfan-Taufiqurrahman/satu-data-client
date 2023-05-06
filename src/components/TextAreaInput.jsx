import React from "react";
import { Field } from "formik";
const TextAreaInput = ({ label, name, mandatory = false, error }) => {
  return (
    <div>
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
        as="textarea"
        rows={4}
        placeholder={label}
        className={`block p-2.5 w-full text-sm text-gray-900 ${
          error
            ? "bg-red-50 rounded-lg border border-red-300 focus:ring-red-500 focus:border-red-500"
            : "bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        } `}
      />
      {error && <p className="mt-2 text-sm text-red-600 ">{error}.</p>}
    </div>
  );
};

export default TextAreaInput;
