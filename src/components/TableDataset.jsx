import React, { useState ,useEffect, useRef } from 'react';
import {
    Outlet,
    Form,
    redirect,
    useNavigation,
  } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import EditIcon from "@mui/icons-material/EditOutlined";
import { Button, IconButton, Tooltip } from '@mui/material';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import { getAllDataset } from '../api/Dataset';
import Loading from '../components/Loading'
import { useQuery, useMutation } from "react-query";
import { red, yellow } from '@mui/material/colors';
import Cookies from "universal-cookie";
import axios from 'axios';
const cookies = new Cookies();

const ImportExcel = () => {
  const [title, setTitle] = useState('');
  const [excel, setExcel] = useState(null);
  const [description, setDescription] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleExcelChange = (e) => {
    setExcel(e.target.files[0]);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('excel', excel);
      formData.append('description', description);

      const response = await axios.post('http://127.0.0.1:8000/api/dataset/excel/import', formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${cookies.get("Authorization")}`,
        }
      });

      console.log(response.data); // Handle response as needed

      // Close the modal
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {/* Button to open modal */}
      <button onClick={() => setModalOpen(true)}>Open Modal</button>

      {/* Modal */}
      {modalOpen && (
        <div>
          {/* Modal content */}
          <div>
            {/* Title input */}
            <input type="text" value={title} onChange={handleTitleChange} />

            {/* Excel file input */}
            <input type="file" onChange={handleExcelChange} />

            {/* Description input */}
            <input type="text" value={description} onChange={handleDescriptionChange} />

            {/* Submit button */}
            <button onClick={handleSubmit}>Submit</button>

            {/* Close modal button */}
            <button onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};


const ModalConfirm = ({ setOpenConfirm, deleteDataset }) => {
    const handleConfirm = () => {
        deleteDataset();
        setOpenConfirm(false);
    };
    return(
        <div id='popup-modal' tabIndex="-1" className='fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-gray-500/40 flex items-center justify-center'>
            <div className='relative w-full h-full max-w-md md:h-auto'>
                <div className="relative bg-white rounded-lg shadow ">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                        data-modal-hide="popup-modal"
                        onClick={() => setOpenConfirm(false)}>
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                        Apakah Anda Yakin akan Menghapus Paket Ini?
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

const DatasetTable = () => {
    const dataset = useQuery("datasetSkema", getAllDataset, {
        refetchInterval:2000,
    })
    const tableRef = useRef(null);
    const datasetDelete = useMutation((id) =>{
        return axios.delete(`http://127.0.0.1:8000/api/dataset/excel/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.get("Authorization")}`,
                },
            });
        });
    const navigate = useNavigation();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [dataClick, setDataClick] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const handelClick = (data) => {
      setDataClick(data);
      setOpen(true);
    };
    useEffect(() => {
        if (tableRef.current) {
          $(tableRef.current).DataTable();
        }
      }, []);
    return(
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {/* <ImportExcel></ImportExcel> */}
            <h1>Dataset</h1>
            {dataset.isLoading ? (
                <Loading />
            ): (
            <table className="table-auto" ref={tableRef}>
                <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3">id</th>
                        <th scope="col" className="px-6 py-3">name</th>
                        <th scope="col" className="px-6 py-3">source</th>
                        <th scope="col" className="px-6 py-3">description</th>
                        <th scope="col" className="px-6 py-3">action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataset.data?.map((dataset) => (
                        <tr className="bg-white border-b" key={dataset.datasetId}>
                            <th scope="row"className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{dataset.datasetId}</th>
                            {/* <td className="px-6 py-4">{dataset.datasetId}</td> */}
                            <td className="px-6 py-4">{dataset.title}</td>
                            <td className="px-6 py-4">{dataset.name_excel}</td>
                            <td className="px-6 py-4">{dataset.description}</td>
                            <td className="px-6 py-4">
                            <td className="px-6 py-4"><Tooltip title="Delete">
                                <IconButton
                                    className="text-rose-500"
                                    onClick={() => setOpenConfirm(true)}
                                >
                                    <DeleteIcon sx={{ color: red[300] }}/>
                                </IconButton>
                                </Tooltip>
                                {openConfirm && (
                                    <ModalConfirm
                                        setOpenConfirm={setOpenConfirm}
                                        deleteDataset= {() => datasetDelete.mutate(dataset.datasetId)}
                                    />
                                )}
                            </td>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            
        </div>

    );
}

export default DatasetTable;

export const AppDatasets = () =>{
    return(
        <DatasetTable />
    )
}