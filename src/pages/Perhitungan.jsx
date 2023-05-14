import React, { useEffect, useState } from "react";

import { dataRumus } from "../data/dataHitung";

const Perhitungan = () => {
  const [selectedIdAtas, setSelectedIdAtas] = useState("");
  const [variableAtas, setVariableAtas] = useState({});
  const [selectedIdBawah, setSelectedIdBawah] = useState("");
  const [variableBawah, setVariableBawah] = useState({});
  const [result, setResult] = useState("0");

  const handleSelectChangeAtas = (e) => {
    const id = parseInt(e.target.value);
    setSelectedIdAtas(id);

    const selectedObj = dataRumus.atas.find((item) => item.id === id);
    setVariableAtas(selectedObj);
  };

  const handleSelectChangeBawah = (e) => {
    const id = parseInt(e.target.value);
    setSelectedIdBawah(id);
    console.log(id);

    const selectedObj = dataRumus.bawah.find((item) => item.id === id);
    setVariableBawah(selectedObj);
  };

  useEffect(() => {
    if (variableAtas.value && variableBawah.value) {
      if (
        variableAtas.name === "Ketersediaan Listrik" &&
        variableBawah.name === "Kebutuhan Listrik"
      ) {
        const result = Number(variableAtas.value) / Number(variableBawah.value);
        // console.log(result);
        setResult(result);
      } else {
        const result =
          (Number(variableAtas.value) / Number(variableBawah.value)) * 100;
        // console.log(result);
        setResult(result);
      }
    }
  }, [variableAtas.value, variableBawah.value]);

  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        Perhitungan
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      <div className="border border-gray-200 rounded-md p-6 flex flex-row items-center">
        <div className="w-9/12">
          <div className="flex gap-x-4">
            <div className="w-6/12 gap-x-4">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Pilihan 1
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={handleSelectChangeAtas}
                value={selectedIdAtas}
              >
                <option value="">Pilih Opsi</option>
                {dataRumus.atas.map((rumus, index) => (
                  <option value={rumus.id} key={index}>
                    {rumus.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="pt-9">
              <h1>=</h1>
            </div>
            <div className="pt-7">
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
                value={variableAtas.value | 0}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="w-10/12 h-0 border border-gray-800" />
            {variableAtas.name === "Ketersediaan Listrik" &&
            variableBawah.name === "Kebutuhan Listrik" ? (
              ""
            ) : (
              <>
                <span className="font-semibold">X</span>
                <span className="font-semibold">100%</span>
              </>
            )}

            <span className="font-semibold">=</span>
          </div>
          <div className="flex gap-x-4 mt-4">
            <div className="w-6/12 gap-x-4">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Pilihan 2
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={handleSelectChangeBawah}
                value={selectedIdBawah}
              >
                <option value="">Pilih Opsi</option>
                {dataRumus.bawah.map((rumus, index) => (
                  <option value={rumus.id} key={index}>
                    {rumus.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="pt-9">
              <h1>=</h1>
            </div>
            <div className="pt-7">
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
                value={variableBawah.value | 0}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center px-6 w-3/12">
          <div className="w-full">
            <input
              type="number"
              id="disabled-input"
              aria-label="disabled input"
              className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
              value={result}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perhitungan;
