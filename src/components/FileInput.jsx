import React from "react";

const FileInput = ({ setFieldValue, label, name, error }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
        id={name}
        type="file"
        onChange={(event) => {
          setFieldValue(name, event.currentTarget.files[0]);
        }}
      />
      {error && <p className="mt-2 text-sm text-red-600 ">{error}.</p>}
    </div>
  );
};

export default FileInput;
