import React, { useEffect, useState } from "react";

// import { dataRumus } from "../data/dataHitung";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getDataMentah } from "../api/datamentah";
import Loading from "../components/Loading";
import { Form, Formik, Field } from "formik";
import FieldInput from "./config/fieldInput";
import SelectInput from "../components/SelectInput";
import * as yup from "yup";
import { Alert, Button } from "@mui/material";
import { createPerhitungan } from "../api/perhitungan";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useNavigate } from "react-router-dom";

const Perhitungan = () => {
  const [selectedIdAtas, setSelectedIdAtas] = useState("");
  const [variableAtas, setVariableAtas] = useState({});
  const [selectedIdBawah, setSelectedIdBawah] = useState("");
  const [variableBawah, setVariableBawah] = useState({});
  const [result, setResult] = useState(0);
  const dataRumuses = useQuery("dataMentah", getDataMentah);
  const startYear = 2010;
  const [statusDone, setStatusDone] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  );
  const optionYear = years.map((year, index) => ({
    id: index,
    value: year,
    name: year,
  }));
  const queryClient = useQueryClient();

  const perhitunganMutation = useMutation(createPerhitungan, {
    onSuccess: () => {
      // setOpenAdd(false);
      queryClient.invalidateQueries(["perhitungan"]);
      setStatusDone(true);
      console.log("sukses");
    },
  });
  const navigate = useNavigate();
  const handleSelectChangeAtas = (e) => {
    const id = parseInt(e.target.value);
    setSelectedIdAtas(id);

    const selectedObj = dataRumuses.data?.atas.find((item) => item.id === id);
    setVariableAtas(selectedObj);
  };

  const handleSelectChangeBawah = (e) => {
    const id = parseInt(e.target.value);
    setSelectedIdBawah(id);
    console.log(id);

    const selectedObj = dataRumuses.data?.bawah.find((item) => item.id === id);
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
  const validationSchema = yup.object({
    value: yup.number("Hasil Harus ada").required("Hasil tidak boleh kosong"),
    tahun: yup.string("Masukkan Tahun").required("Tahun tidak boleh kosong"),
  });
  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        Perhitungan
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      {statusDone && (
        <Alert className="mb-8" onClose={() => setStatusDone(false)}>
          Data Berhasil Disimpan!
        </Alert>
      )}
      <Button
        variant="outlined"
        startIcon={<BarChartIcon />}
        className="mb-8"
        onClick={() => navigate("/perhitungan/chart")}
      >
        Chart
      </Button>
      {dataRumuses.isLoading ? (
        <Loading />
      ) : (
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
                  {dataRumuses.data?.atas.map((rumus, index) => (
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
                  {dataRumuses.data?.bawah.map((rumus, index) => (
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
      )}
      <div className="">
        <Formik
          initialValues={{
            tahun: "",
            value: result,
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // console.log(values);
            perhitunganMutation.mutate(values);
          }}
        >
          {({ values, errors }) => (
            <Form>
              {console.log(errors)}
              <div className="flex w-full mt-4 justify-between">
                <div className="w-9/12">
                  <SelectInput
                    option={optionYear}
                    label="Pilih Tahun"
                    name="tahun"
                    key={1}
                    error={errors.tahun}
                    mandatory={true}
                  />
                </div>
                <div className="align-bottom">
                  <Button
                    variant="contained"
                    className="bg-sky-700"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Perhitungan;
