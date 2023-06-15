import React from "react";
import { Field } from "formik";

const SelectInput = ({ mandatory, label, name, option, error }) => {
  return (
    <div className="">
      <label
        htmlFor="countries"
        className={`block mb-2 text-sm font-medium ${
          error ? "text-red-700" : "text-gray-900"
        } `}
      >
        {label} {mandatory ? <span className="text-red-700">*</span> : ""}
      </label>
      <Field
        as="select"
        name={name}
        className={`${
          error
            ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
        }  border-2  text-sm rounded-lg   block w-full p-2.5 outline-none`}
      >
        <option value="">Pilih {label}</option>
        {option?.map((o) => (
          <option key={o.id} value={o.value}>
            {o.name}
          </option>
        ))}
      </Field>
      {error && <p className="mt-2 text-sm text-red-600 ">{error}.</p>}
    </div>
  );
};

export default SelectInput;
