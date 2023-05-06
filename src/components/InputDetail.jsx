import React from "react";

const InputDetail = ({ label, value }) => {
  return (
    <div className="">
      <label htmlFor={label} className={`block mb-2 text-sm font-medium `}>
        {label}
      </label>
      <input
        id={label}
        value={value}
        name={label}
        className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
        disabled
      />
    </div>
  );
};

export default InputDetail;
