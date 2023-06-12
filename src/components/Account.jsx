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
import Cookies from "universal-cookie";
const cookies = new Cookies();
import { 
    getAllUser,
    removeUser,
    updateUser,
 } from '../api/Accounts';
import Loading from '../components/Loading'
import { useQuery, QueryClient, QueryClientProvider, useMutation } from "react-query";
import axios from 'axios';
import { red, yellow } from '@mui/material/colors';
const queryClient = new QueryClient();

const ModalConfirm = ({ setOpenConfirm, deleteUser }) => {
    const handleConfirm = () => {
        deleteUser();
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

// const ModalUbah = ({ setOpenModal, editConfirmation, user, setConfirmation }) => {
//   const [confirmation, setConfirmation] = useState(user.confirmation);

//   const handleConfirmationChange = (e) => {
//     setConfirmation(e.target.value);
//   }

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     try{
//       const response = await axios.patch(`http://127.0.0.1:8000/api/admin/edit/${id}`, {
//         confirmation: setConfirmation,
        
//       })
//     }catch{

//     }
//   }
// };

const ModalEdit = ({ setOpenEdit, updateUser}) => {
  const [editedUser, setEditedUser] = useState(user)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(editedUser);
    setOpenEdit(false);
  };
  return(
    <div id='edit-modal' tabIndex='-1' className='fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-gray-500/40 flex items-center justify-center'>
      <div className='relative w-full h-full max-w-md md:h-auto'>
        <div className='relative bg-white rounded-lg shadow'>
          <button type='button'
            className='absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center '
            data-modal-hide='edit-modal'
            onClick={() => setOpenEdit(false)}>
              <svg
              aria-hidden='true'
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
          <div className='p-6'>
            <h3 className='mb-5 text-lg font-normal text-gray-500'>
              edit user
            </h3>
            <form action={handleSubmit}>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                value={editedUser.name}
                onChange={handleChange}
                className='block w-full mt-1 p-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              />
                            <label htmlFor='email' className='block mt-4 text-sm font-medium text-gray-700'>
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                value={editedUser.email}
                onChange={handleChange}
                className='block w-full mt-1 p-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

const UsersTable = () => {
    const users = useQuery("users", getAllUser, {
        refetchInterval: 2000,
    });

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handelClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const tableRef = useRef(null);
    const userDelete = useMutation((id) => {
        return axios.delete(`http://127.0.0.1:8000/api/admin/${id}`,  {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies.get("Authorization")}`,
            },
          });
    });
    const [edit, setEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    useEffect(() => {
        if (tableRef.current) {
          $(tableRef.current).DataTable();
        }
      }, []);

    return(
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1>Daftar Peserta</h1>
            { users.isLoading ? (
                <Loading />
            ): (
                <table className="table-auto" ref={tableRef}>
                <thead>
                    <tr>
                        <th scope="col" className="px-2 py-3">id</th>
                        <th scope="col" className="px-8 py-3">Nama</th>
                        <th scope="col" className="px-8 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Role id</th>
                        <th scope="col" className="px-4 py-3">Status Konfirmasi</th>
                        <th scope="col" className="px-8 py-3">PIC</th>
                        <th scope="col" className="px-6 py-3">Surat Pengantar</th>
                        {/* <th scope="col" className="px-6 py-3">Edit</th> */}
                        <th scope="col" className="px-6 py-3">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {/* console.log({users.data}); */}
                    {users.data?.map((user) => (
                        <tr className="bg-white border-b" key={user.id}>
                            <th scope="row"className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{user.id}</th>
                            <td className="px-6 py-4">{user.name}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.role_id}</td>
                            <td className="px-6 py-4">{user.confirmed ? 'Yes': 'No'}</td> {/* Display "Yes" or "No" based on the confirmed value */}
                            <td className="px-6 py-4">{user.pic}</td>
                            <td className="px-6 py-4">{user.covering_letter}</td>
                            {/* <td className="px-6 py-4"><Tooltip title="Edit">
                                <IconButton
                                    className="text-rose-500"
                                    onClick={() => handelClick(user)}
                                >
                                    <EditIcon sx={{ color: yellow[500] }}/>
                                </IconButton>
                                </Tooltip>
                                {edit && (
                                    <ModalEdit
                                        data = {editData}
                                    />
                                )}
                            </td> */}
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
                                        deleteUser= {() => userDelete.mutate(user.id)}
                                    />
                                )}
                            </td>

                        </tr>
                        ))
                        }
                </tbody>
            </table>
            )
        }
        </div>
    );
}

export default UsersTable;


