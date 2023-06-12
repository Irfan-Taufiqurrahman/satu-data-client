import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  createMainData,
  getAllMain,
  removeMainData,
  updateMainData,
} from "../api/maindata";
import Loading from "../components/Loading";
import AddIcon from "@mui/icons-material/Add";
import { Form, Formik } from "formik";
import * as yup from "yup";
import FieldInput from "./config/fieldInput";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DataTable from "../components/DataTable";

const ModalTambah = ({ setOpenAdd }) => {
  const mainDataMutation = useMutation(createMainData, {
    onSuccess: () => {
      setOpenAdd(false);
    },
  });

  const validationSchema = yup.object({
    code_main: yup
      .number("Harus Angka")
      .required("Code Main tidak boleh kosong"),
    title_main: yup
      .string("Masukkan Title Main")
      .required("Title Main tidak boleh kosong"),
  });
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-gray-400/30">
      <div className="relative w-full h-full  max-w-2xl md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow ">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Tambah Main Data
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              onClick={() => setOpenAdd(false)}
              data-modal-hide="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <Formik
            initialValues={{
              code_main: "",
              title_main: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              mainDataMutation.mutate(values);
              setOpenAdd(false);
            }}
          >
            {({ values, errors }) => (
              <Form>
                {/* {console} */}
                <div className="grid grid-cols-1 text-start mx-auto p-6 space-y-3">
                  <FieldInput
                    error={errors.code_main}
                    name="code_main"
                    label="Kode Main"
                    mandatory={true}
                    type="number"
                  />
                  <FieldInput
                    error={errors.title_main}
                    name="title_main"
                    label="Title Main"
                    mandatory={true}
                    type="text"
                  />
                  {/* {console.log(errors)} */}
                </div>
                {/* <!-- Modal footer --> */}
                {/* {console.log(values)} */}
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                  <button
                    data-modal-hide="defaultModal"
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Tambah
                  </button>
                  <button
                    data-modal-hide="defaultModal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                    onClick={() => setOpenAdd(false)}
                  >
                    Batal
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
const ModalUbah = ({ setOpenEdit, data }) => {
  const mainDataMutation = useMutation(updateMainData, {
    onSuccess: () => {
      setOpenEdit(false);
    },
  });
  // console.log(data);

  const validationSchema = yup.object({
    code_main: yup
      .number("Harus Angka")
      .required("Kode Main tidak boleh kosong"),
    title_main: yup
      .string("Masukkan Title Main")
      .required("Title Main tidak boleh kosong"),
  });
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-gray-400/30">
      <div className="relative w-full h-full  max-w-2xl md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow ">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Ubah Main Data
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              onClick={() => setOpenEdit(false)}
              data-modal-hide="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <Formik
            initialValues={{
              code_main: data.code_main,
              title_main: data.title_main,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              mainDataMutation.mutate({ data: values, id: data.id });
              setOpenEdit(false);
            }}
          >
            {({ values, errors }) => (
              <Form>
                {/* {console} */}
                <div className="grid grid-cols-1 text-start mx-auto p-6 space-y-3">
                  <FieldInput
                    error={errors.code_main}
                    name="code_main"
                    label="Code Main"
                    mandatory={true}
                    type="number"
                  />
                  <FieldInput
                    error={errors.title_main}
                    name="title_main"
                    label="Title Main"
                    mandatory={true}
                    type="text"
                  />
                  {/* {console.log(errors)} */}
                </div>
                {/* <!-- Modal footer --> */}
                {/* {console.log(values)} */}
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                  <button
                    data-modal-hide="defaultModal"
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Ubah
                  </button>
                  <button
                    data-modal-hide="defaultModal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                    onClick={() => setOpenEdit(false)}
                  >
                    Batal
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const ModalConfirm = ({ setOpenConfirm, deleteData }) => {
  const handleConfirm = () => {
    deleteData();
    setOpenConfirm(false);
  };
  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-gray-500/40 flex items-center justify-center"
    >
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow ">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
            data-modal-hide="popup-modal"
            onClick={() => setOpenConfirm(false)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 text-gray-400 w-14 h-14 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 ">
              Apakah Anda Yakin akan Menghapus Main Data Ini?
            </h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              onClick={handleConfirm}
            >
              Ya, Saya Yakin
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              onClick={() => setOpenConfirm(false)}
            >
              Tidak, Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainDataPage = () => {
  const mainData = useQuery("mainData", getAllMain, {
    refetchInterval: 200,
  });
  const mainDataDelete = useMutation(removeMainData);
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);
  const [idData, setIdData] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const columns = useMemo(() => [
    {
      Header: "Kode Main Data",
      accessor: "code_main",
    },
    {
      Header: "Judul Main Data",
      accessor: "title_main",
    },
  ]);
  const dataTable = useMemo(() => mainData.data, [mainData.data]);
  // console.log(dataTable);

  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        Main Data
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      {mainData.isLoading ? (
        <Loading />
      ) : (
        <div className="sm:w-11/12 mx-auto">
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            className="mb-4"
            onClick={() => setOpenAdd(true)}
          >
            Main Data
          </Button>
          {openAdd && <ModalTambah setOpenAdd={setOpenAdd} />}

          <DataTable
            columns={columns}
            data={dataTable}
            setOpenEdit={setOpenEdit}
            setDataEdit={setDataEdit}
            setIdData={setIdData}
            setOpenConfirm={setOpenConfirm}
            link={"theamtic-data/"}
            title="main"
          />
          {openEdit && <ModalUbah setOpenEdit={setOpenEdit} data={dataEdit} />}
          {openConfirm && (
            <ModalConfirm
              setOpenConfirm={setOpenConfirm}
              deleteData={() => mainDataDelete.mutate(idData)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MainDataPage;
