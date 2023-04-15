import { useMutation, useQuery } from "react-query"
import { createMainData, getAllMain, updateMainData } from "../../api/Taksonomi"
import React, { useEffect, useRef, useState } from "react"
import Loading from "../Loading"
import { Button, FilledInput, IconButton, Tooltip, colors } from '@mui/material';
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import EditIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Formik, useFormik, Form } from "formik";
import { red, yellow } from '@mui/material/colors';
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import FieldInput from "../../pages/config/fieldInput";
const cookies = new Cookies();

export const AddMainModal = () => {
    const [codeMain, setCodeMain] = useState('');
    const [titleMain, setTitleMain] = useState('');
    const [showModal, setShowModal] = useState(false);
  
    const handleCodeMainChange = (e) => {
      setCodeMain(e.target.value);
    }
  
    const handleTitleMainChange = (e) => {
      setTitleMain(e.target.value);
    }
  
    const handleSubmit = () => {
      // Perform post request using Axios
      axios.post('http://127.0.0.1:8000/api/maindata/store', { code_main: codeMain, title_main: titleMain })
        .then(response => {
          // Handle successful response
          console.log(response.data);
          setShowModal(false); // Close the modal
        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
    }
  
    const handleCloseModal = () => {
      setShowModal(false); // Close the modal
    }
  
    return (
      <div>
        {/* Button to open the modal */}
        <Button variant="outlined" startIcon={<AddIcon></AddIcon>} onClick={() => setShowModal(true)} className="mb-4">Create Main Data</Button>
        {/* Modal */}
        {showModal && (
          <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-gray-400/30">
            <div className="relative w-full h-full  max-w-2xl md:h-auto">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-start justify-between p-4 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Tambah Main Data
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={handleCloseModal} data-modal-hide="defaultModal">
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
                                <span className="sr-only">close</span>
                        </button>
                    </div>
                    <form className="grid grid-cols-1 text-start mx-auto p-6 space-y-3" onSubmit={handleSubmit}>
                        <label className="block mb-4">
                            Code Main:
                            <input className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1" type="text" value={codeMain} onChange={handleCodeMainChange} />
                        </label>
                        <label className="block mb-4">
                            Title Main:
                            <input className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1" type="text" value={titleMain} onChange={handleTitleMainChange} />
                        </label>
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                            <button
                                data-modal-hide="defaultModal"
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                onClick={handleSubmit}
                            >Tambah Main</button>
                            <button
                                data-modal-hide="defaultModal"
                                type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                                onClick={() => setShowModal(false)}
                            >Batal</button>
                        </div>
                    </form>
                </div>
            </div>
          </div>
        )}
      </div>
    );
}
  
const MainDataDeleteModal = ({ mainData }) => {
    const [showModal, setShowModal] = useState(false);
  
    const handleDelete = () => {
      // Perform delete request using Axios
      axios.delete(`http://127.0.0.1:8000/api/maindata/delete/${mainData.id}`)
        .then(response => {
          // Handle successful response
          console.log(response.data);
          setShowModal(false); // Close the modal
        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
    }
  
    const handleCloseModal = () => {
      setShowModal(false); // Close the modal
    }
  
    return (
      <div>
        {/* Button to open the modal */}
        <button onClick={() => setShowModal(true)}>Open Modal</button>
  
        {/* Modal */}
        {showModal && (
          <div>
            <div>Modal Content</div>
            {/* Display code_main and title_main */}
            <p>Code Main: {mainData.code_main}</p>
            <p>Title Main: {mainData.title_main}</p>
            {/* Delete button */}
            <button onClick={handleDelete}>Delete</button>
            {/* Close button */}
            <button onClick={handleCloseModal}>Close</button>
          </div>
        )}
      </div>
    );
  }

const ModalConfirm = ({ setOpenConfirm, deleteMainData }) => {
    const handleConfirm = () => {
        deleteMainData();
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

const ModalEdit = ({ mainData, setMainData }) => {
    const [codeMain, setCodeMain] = useState(mainData.code_main);
    const [titleMain, setTitleMain] = useState(mainData.title_main);
  
    const [showModal, setShowModal] = useState(false);
    const handleCodeMainChange = (e) => {
      setCodeMain(e.target.value);
    }
  
    const handleTitleMainChange = (e) => {
      setTitleMain(e.target.value);
    }
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Make a PATCH request to the API
        const response = await axios.patch(`http://127.0.0.1:8000/api/maindata/update/${mainData.id}`, {
          code_main: codeMain,
          title_main: titleMain
        });
  
        // Handle success
        console.log("Data has been successfully updated:", response.data);
  
        // Update mainData state with the updated data
        setMainData(response.data);
  
        // Close the modal
        setShowModal(false);
      } catch (error) {
        // Handle error
        console.error("Error updating data:", error);
      }
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
    // button to open
    <div>
        <button className="mb-4" onClick={() => setShowModal(true)}><EditIcon sx={{ color: yellow[500] }}/></button>
        {/* modal */}
        {showModal && (
        <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-gray-400/30">
            <div className="relative w-full h-full  max-w-2xl md:h-auto">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-start justify-between p-4 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Update Main Data
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={handleCloseModal} data-modal-hide="defaultModal">
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
                                <span className="sr-only">close</span>
                        </button>
                    </div>
                    <form onSubmit={handleFormSubmit} className="grid grid-cols-1 text-start mx-auto p-6 space-y-3">
                        <label className="block mb-4">
                        Code Main:
                        <input type="text" value={codeMain} onChange={handleCodeMainChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                        </label>
                        <label className="block mb-4">
                        Title Main:
                        <input type="text" value={titleMain} onChange={handleTitleMainChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                        </label>
                        <button data-modal-hide="defaultModal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                        <button
                                data-modal-hide="defaultModal"
                                type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                                onClick={() => setShowModal(false)}
                            >Batal</button>
                    </form>
                </div>
            </div>

        </div>
        )}

      </div>
    );
}

export const Main = () =>{
    const main = useQuery("MainSkema", getAllMain,{
        refetchInterval:2000,
    })
    const MainDelete = useMutation((id) =>{
        return axios.delete(`http://127.0.0.1:8000/api/maindata/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.get("Authorization")}`,
              },
        });
    });

    const navigate = useNavigate();
    const tableRef = useRef(null);
    const [edit, setEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [editData, setEditData] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [mainData, setMainData] = useState({});
    const ref = useRef(null);

    const handleClickek = event => {
        console.log(event.currentTarget.code_main);

        console.log(ref.current.code_main);
      };
// Function to handle opening the modal
    const openModal = () => {
        setShowModal(true);
    }

  // Function to handle closing the modal
    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleClick = (data) => {
        setEditData(data);
        setEdit(true);
    };
    useEffect(() => {
        if(tableRef.current){
            $(tableRef.current).DataTable();
        }
    }, []);
    return(
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

            <AddMainModal></AddMainModal>
            
            <h1>Main Data</h1>
            {main.isLoading ? (
                <Loading />
            ): (
                <div className="sm:w-11/12 mx-auto">
                    <table className="table-auto" ref={tableRef}>
                        <thead>
                            <tr>
                                <th scope="col" className="px-6 py-3">kode</th>
                                <th scope="col" className="px-6 py-3">nama</th>
                                {/* <th scope="col" className="px-6 py-3">Detail</th> */}
                                <th scope="col" className="px-6 py-3">Delete</th>
                                <th scope="col" className="px-6 py-3">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {console.log(main.data)} */}
                            {main.data?.map((mainData) =>(
                                <tr className="bg-white border-b" key={mainData.id}>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{mainData.code_main}</td>
                                    <td className="px-6 py-4">{mainData.title_main}</td>
                                    
                                    <td className="px-6 py-4">
                                        <Tooltip title="Delete">
                                            <IconButton className="text-rose-500" onClick={() => setOpenConfirm(true)}>
                                                <DeleteIcon sx={{ color: red[300] }}/>
                                            </IconButton>
                                        </Tooltip>
                                        {openConfirm && (
                                            <ModalConfirm 
                                                setOpenConfirm={setOpenConfirm}
                                                deleteMainData={() => MainDelete.mutate(mainData.id)}
                                            />
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <ModalEdit
                                            showModal={showModal}
                                            setShowModal={setShowModal}
                                            mainData={mainData}
                                            setMainData={setMainData}
                                        />
                                    </td>
                                </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}