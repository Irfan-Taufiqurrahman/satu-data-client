import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FieldInput from "./config/fieldInput";
import {
  createTopicData,
  getTopicData,
  removeTopicData,
  updateTopicData,
} from "../api/topicdata";
import Loading from "../components/Loading";
import DataTable from "../components/DataTable";

const ModalTambah = ({ setOpenAdd, id }) => {
  const topicDataMutation = useMutation(createTopicData, {
    onSuccess: () => {
      setOpenAdd(false);
    },
  });

  const validationSchema = yup.object({
    code_topic: yup
      .number("Harus Angka")
      .required("Kode Topic tidak boleh kosong"),
    kinerja_utama: yup
      .string("Masukkan Kinerja Utama")
      .required("Kinerja Utama tidak boleh kosong"),
    sumber_data: yup
      .string("Masukkan Sumber Data")
      .required("Sumber Data tidak boleh kosong"),
    penanggungjawab: yup
      .string("Masukkan Penanggung Jawab")
      .required("Penanggung Jawab tidak boleh kosong"),
    thematic_code: yup
      .string("Masukkan Thematic Code")
      .required("Thematic Code tidak boleh kosong"),
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
            initialValues={{
              code_topic: "",
              thematic_code: id,
              kinerja_utama: "",
              sumber_data: "",
              penanggungjawab: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              topicDataMutation.mutate(values);
              // console.log(values);
              setOpenAdd(false);
            }}
          >
            {({ values, errors }) => (
              <Form>
                {/* {console.log(errors)} */}
                <div className="grid grid-cols-1 text-start mx-auto p-6 space-y-3">
                  <FieldInput
                    error={errors.code_topic}
                    name="code_topic"
                    label="Kode Topic"
                    mandatory={true}
                    type="number"
                  />
                  <FieldInput
                    error={errors.kinerja_utama}
                    name="kinerja_utama"
                    label="Kinerja Utama"
                    mandatory={true}
                    type="text"
                  />
                  <FieldInput
                    error={errors.sumber_data}
                    name="sumber_data"
                    label="Sumber Data"
                    mandatory={true}
                    type="text"
                  />
                  <FieldInput
                    error={errors.penanggungjawab}
                    name="penanggungjawab"
                    label="Penanggung Jawab"
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
                    Buat
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
  const topicDataMutation = useMutation(updateTopicData, {
    onSuccess: () => {
      setOpenEdit(false);
    },
  });
  // console.log(data);

  const validationSchema = yup.object({
    code_topic: yup
      .string("Masukkan Kode Topic")
      .required("Kode Topic tidak boleh kosong"),
    kinerja_utama: yup
      .string("Masukkan Kinerja Utama")
      .required("Kinerja Utama tidak boleh kosong"),
    sumber_data: yup
      .string("Masukkan Sumber Data")
      .required("Sumber Data tidak boleh kosong"),
    penanggungjawab: yup
      .string("Masukkan Penanggung Jawab")
      .required("Penanggung Jawab tidak boleh kosong"),
    thematic_code: yup
      .string("Masukkan Thematic Code")
      .required("Thematic Code tidak boleh kosong"),
  });
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-gray-400/30">
      <div className="relative w-full h-full  max-w-2xl md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow ">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Ubah Topic Data
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
              code_topic: data.code_topic,
              thematic_code: data.thematic_code,
              kinerja_utama: data.kinerja_utama,
              sumber_data: data.sumber_data,
              penanggungjawab: data.penanggungjawab,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              topicDataMutation.mutate({ data: values, id: data.id });
              setOpenEdit(false);
            }}
          >
            {({ values, errors }) => (
              <Form>
                {/* {console} */}
                <div className="grid grid-cols-1 text-start mx-auto p-6 space-y-3">
                  <FieldInput
                    error={errors.code_topic}
                    name="code_topic"
                    label="Kode Topic"
                    mandatory={true}
                    type="text"
                  />
                  <FieldInput
                    error={errors.kinerja_utama}
                    name="kinerja_utama"
                    label="Kinerja Utama"
                    mandatory={true}
                    type="text"
                  />
                  <FieldInput
                    error={errors.sumber_data}
                    name="sumber_data"
                    label="Sumber Data"
                    mandatory={true}
                    type="text"
                  />
                  <FieldInput
                    error={errors.penanggungjawab}
                    name="penanggungjawab"
                    label="Penanggung Jawab"
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

const TopicData = () => {
  // const { id } = useParams();
  const location = useLocation();

  const topicData = useQuery(
    "topicData",
    () => getTopicData(location.state.thematic_code),
    {
      refetchInterval: 200,
    }
  );
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);
  const [idData, setIdData] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const columns = useMemo(() => [
    {
      Header: "Kode Topic",
      accessor: "code_topic",
    },
    {
      Header: "Kinerja Utama",
      accessor: "kinerja_utama",
    },
    {
      Header: "Sumber Data",
      accessor: "sumber_data",
    },
    {
      Header: "Penanggung Jawab",
      accessor: "penanggungjawab",
    },
  ]);

  const dataTable = useMemo(() => topicData.data, [topicData.data]);
  const topicDataDelete = useMutation(removeTopicData);

  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        Topic Data
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      {topicData.isLoading ? (
        <Loading />
      ) : (
        <div className="sm:w-11/12 mx-auto">
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            className="mb-4"
            onClick={() => setOpenAdd(true)}
          >
            Topic Data
          </Button>
          {/* {console.log(openAdd)} */}
          {openAdd && (
            <ModalTambah
              setOpenAdd={setOpenAdd}
              id={location.state.thematic_code}
            />
          )}

          <DataTable
            columns={columns}
            data={dataTable}
            setOpenEdit={setOpenEdit}
            setDataEdit={setDataEdit}
            setIdData={setIdData}
            setOpenConfirm={setOpenConfirm}
            link={"/main-data/sub-topic-data/"}
            title="sub-topik"
          />
          {/* console.log() */}
          {openConfirm && (
            <ModalConfirm
              setOpenConfirm={setOpenConfirm}
              deleteData={() => topicDataDelete.mutate(idData)}
            />
          )}
          {openEdit && <ModalUbah setOpenEdit={setOpenEdit} data={dataEdit} />}
        </div>
      )}
    </div>
  );
};

export default TopicData;
