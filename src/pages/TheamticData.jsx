import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  createThematicData,
  getTheamticData,
  removeThematicData,
  updateThematicData,
} from "../api/theamticdata";
import Loading from "../components/Loading";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DataTable from "../components/DataTable";
import * as yup from "yup";
import { Form, Formik } from "formik";
import FieldInput from "./config/fieldInput";

const ModalTambah = ({ setOpenAdd, id }) => {
  const thematicDataMutation = useMutation(createThematicData, {
    onSuccess: () => {
      setOpenAdd(false);
    },
  });

  const validationSchema = yup.object({
    code_thematic: yup
      .number("Harus Angka")
      .max(100, "Kode Thematic harus kurang dari 100")
      .required("Kode Thematic tidak boleh kosong"),
    main_code: yup
      .number("Harus Angka")
      .required("Code Main tidak boleh kosong"),
    title_thematic: yup
      .string("Masukkan Judul Thematic")
      .required("Judul Thematic tidak boleh kosong"),
  });
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-gray-400/30">
      <div className="relative w-full h-full  max-w-2xl md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow ">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Tambah Thematic Data
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
              code_thematic: "",
              title_thematic: "",
              main_code: id,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              thematicDataMutation.mutate(values);
              setOpenAdd(false);
            }}
          >
            {({ values, errors }) => (
              <Form>
                {/* {console} */}
                <div className="grid grid-cols-1 text-start mx-auto p-6 space-y-3">
                  <FieldInput
                    error={errors.code_thematic}
                    name="code_thematic"
                    label="Kode Thematic"
                    mandatory={true}
                    type="number"
                  />
                  <FieldInput
                    error={errors.title_thematic}
                    name="title_thematic"
                    label="Judul Thematic"
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
  const thematicDataMutation = useMutation(updateThematicData, {
    onSuccess: () => {
      setOpenEdit(false);
    },
  });
  // console.log(data);

  const validationSchema = yup.object({
    code_thematic: yup
      .number("Harus Angka")
      .max(100, "Code Thematic harus kurang dari 100")
      .required("Code Thematic tidak boleh kosong"),
    main_code: yup
      .number("Harus Angka")
      .required("Code Main tidak boleh kosong"),
    title_thematic: yup
      .string("Masukkan Title Thematic")
      .required("Title Thematic tidak boleh kosong"),
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
              code_thematic: data.code_thematic,
              title_thematic: data.title_thematic,
              main_code: data.main_code,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              thematicDataMutation.mutate({ data: values, id: data.id });
              setOpenEdit(false);
            }}
          >
            {({ values, errors }) => (
              <Form>
                {/* {console} */}
                <div className="grid grid-cols-1 text-start mx-auto p-6 space-y-3">
                  <FieldInput
                    error={errors.code_thematic}
                    name="code_thematic"
                    label="Code Thematic"
                    mandatory={true}
                    type="text"
                  />
                  <FieldInput
                    error={errors.title_thematic}
                    name="title_thematic"
                    label="Title Thematic"
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
              Apakah Anda Yakin akan Menghapus Thematic Data Ini?
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

const TheamticData = () => {
  const { id } = useParams();
  const [openAdd, setOpenAdd] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [idData, setIdData] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const thematicDataDelete = useMutation(removeThematicData);
  const { data, isLoading } = useQuery(
    "theamticData",
    () => getTheamticData(id),
    {
      refetchInterval: 200,
    }
  );
  const columns = useMemo(
    () => [
      {
        Header: "Kode Thematic",
        accessor: "code_thematic",
      },
      {
        Header: "Judul Thematic",
        accessor: "title_thematic",
      },
    ],
    []
  );
  const dataTable = useMemo(() => data, [data]);
  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        Thematic Data
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="">
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            className="mb-4"
            onClick={() => setOpenAdd(true)}
          >
            Thematic Data
          </Button>
          {openAdd && <ModalTambah setOpenAdd={setOpenAdd} id={id} />}

          <DataTable
            columns={columns}
            data={dataTable}
            setOpenEdit={setOpenEdit}
            setDataEdit={setDataEdit}
            setIdData={setIdData}
            setOpenConfirm={setOpenConfirm}
            link={"/main-data/topic-data/"}
            title="thematic-data"
          />
          {openEdit && <ModalUbah setOpenEdit={setOpenEdit} data={dataEdit} />}

          {openConfirm && (
            <ModalConfirm
              setOpenConfirm={setOpenConfirm}
              deleteData={() => thematicDataDelete.mutate(idData)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TheamticData;
