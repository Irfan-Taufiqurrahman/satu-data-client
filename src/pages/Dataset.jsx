import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  createDatasetData,
  getAllDataset,
  removeDataset,
  updateDatasetData,
} from "../api/Dataset";
import Loading from "../components/Loading";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import DataTable from "../components/DataTable";
import { Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import FieldInput from "./config/fieldInput";
import TextAreaInput from "../components/TextAreaInput";
import FileInput from "../components/FileInput";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

const ModalTambah = ({ setOpenAdd }) => {
  const topicDataMutation = useMutation(createDatasetData, {
    // on
    onSuccess: () => {
      setOpenAdd(false);
    },
  });

  const initialValues = { title: "", description: "", name_excel: null };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("name_excel", values.name_excel);

    topicDataMutation.mutate(formData);
    setSubmitting(false);
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title harus diisi"),
    name_excel: yup
      .mixed()
      .required("File harus diisi")
      .test(
        "fileType",
        "File Harus Bertipe XLS and XLSX",
        (value) =>
          value &&
          [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ].includes(value.type)
      ),
    description: yup
      .string()
      .required("Deskripsi harus diisi")
      .max(100, "Deskripsi harus kurang dari 100 kata"),
  });

  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-gray-400/30">
      <div className="relative w-full h-full  max-w-2xl md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow ">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Tambah Topic Data
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, isSubmitting, setFieldValue }) => (
              <Form>
                {/* {console.log(errors)} */}
                <div className="grid grid-cols-1 text-start mx-auto p-6 space-y-3">
                  <FieldInput
                    error={errors.title}
                    name="title"
                    label="Nama"
                    mandatory={true}
                    type="text"
                  />
                  <TextAreaInput
                    error={errors.description}
                    label="Deskripsi"
                    name="description"
                    mandatory
                  />
                  {/* <FieldInput
                    error={errors.description}
                    name="description"
                    label="Description"
                    mandatory={true}
                    type="text"
                  /> */}
                  <FileInput
                    label="File"
                    name="name_excel"
                    error={errors.name_excel}
                    setFieldValue={setFieldValue}
                  />
                  {/* <div>
                    <label htmlFor="name_excel">File</label>
                    <input
                      id="name_excel"
                      type="file"
                      onChange={(event) => {
                        setFieldValue(
                          "name_excel",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                    <ErrorMessage name="name_excel" component="div" />
                  </div> */}
                  {/* {console.log(errors)} */}
                </div>
                {/* <!-- Modal footer --> */}
                {/* {console.log(values)} */}
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                  {/* <Loading */}
                  {/* {console.log(topicDataMutation.isLoading)} */}
                  {topicDataMutation.isLoading ? (
                    <LoadingButton
                      loading
                      loadingPosition="start"
                      startIcon={<SaveIcon />}
                      variant="contained"
                    >
                      Loading...
                    </LoadingButton>
                  ) : (
                    <button
                      data-modal-hide="defaultModal"
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                      disabled={isSubmitting}
                    >
                      BUAT
                    </button>
                  )}

                  <button
                    data-modal-hide="defaultModal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                    onClick={() => setOpenAdd(false)}
                  >
                    BATAL
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
              Apakah Anda Yakin akan Menghapus Dataset Ini?
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

const ModalUbah = ({ setOpenEdit, data }) => {
  const dataSetMutation = useMutation(updateDatasetData, {
    onSuccess: () => {
      setOpenEdit(false);
    },
  });
  // console.log(data);

  const validationSchema = yup.object({
    title: yup
      .string("Masukkan Code Topic")
      .required("Code Topic tidak boleh kosong"),
    description: yup
      .string("Masukkan Kinerja Utama")
      .required("Kinerja Utama tidak boleh kosong")
      .max(1000, "Description harus kurang dari 1000 kata"),
  });
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-gray-400/30">
      <div className="relative w-full h-full  max-w-2xl md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow ">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Ubah Dataset
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
              title: data.title,
              description: data.description,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              dataSetMutation.mutate({ data: values, id: data.datasetId });
              setOpenEdit(false);
            }}
          >
            {({ values, errors }) => (
              <Form>
                {/* {console} */}
                <div className="grid grid-cols-1 text-start mx-auto p-6 space-y-3">
                  <FieldInput
                    error={errors.title}
                    name="title"
                    label="Name"
                    mandatory={true}
                    type="text"
                  />
                  <TextAreaInput
                    error={errors.description}
                    label="Description"
                    name="description"
                    mandatory
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

const Dataset = () => {
  const dataset = useQuery("datasetSkema", getAllDataset, {
    refetchInterval: 2000,
  });
  const [openAdd, setOpenAdd] = useState(false);
  const [idData, setIdData] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "datasetId",
      },
      {
        Header: "Judul",
        accessor: "title",
      },
      {
        Header: "Sumber Data",
        accessor: "name_excel",
      },
      {
        Header: "Deskripsi",
        accessor: "description",
      },
    ],
    []
  );
  const dataTable = useMemo(() => dataset.data, [dataset.data]);
  const datasetDelete = useMutation(removeDataset);
  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        Dataset
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      {dataset.isLoading ? (
        <Loading />
      ) : (
        <div className="">
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            className="mb-4"
            onClick={() => setOpenAdd(true)}
          >
            Dataset
          </Button>
          {openAdd && <ModalTambah setOpenAdd={setOpenAdd} />}
          <DataTable
            columns={columns}
            data={dataTable}
            setOpenEdit={setOpenEdit}
            setDataEdit={setDataEdit}
            setIdData={setIdData}
            title="dataset"
            link="/main-data/datalist"
            setOpenConfirm={setOpenConfirm}
          />
          {openConfirm && (
            <ModalConfirm
              setOpenConfirm={setOpenConfirm}
              deleteData={() => datasetDelete.mutate(idData)}
            />
          )}
          {openEdit && <ModalUbah setOpenEdit={setOpenEdit} data={dataEdit} />}
        </div>
      )}
    </div>
  );
};

export default Dataset;
