import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const GlobalFilter1 = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);
  return (
    <div className="relative mt-1">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        id="table-search"
        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
      />
    </div>
  );
};
const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="relative mt-1">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        id="table-search"
        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search..."
      />
    </div>
  );
};

const DataTable = ({
  columns,
  data,
  setOpenEdit = null,
  setDataEdit = null,
  setOpenConfirm = null,
  setIdData = null,
  link = "",
  title = "",
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    setGlobalFilter,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="mb-2 flex justify-between">
        <div className="w-2/12">
          <select
            id="countries"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="w-5/12 flex justify-end">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
      </div>
      <TableContainer component={Paper} className="shadow-md ">
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow
                className="bg-gray-100"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <TableCell align="center" {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableCell>
                ))}
                {setOpenEdit && setDataEdit && setOpenConfirm && setIdData ? (
                  <TableCell align="center">Action</TableCell>
                ) : (
                  ""
                )}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell align="center" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                  {setOpenEdit && setDataEdit && setOpenConfirm && setIdData ? (
                    <TableCell align="center">
                      {title === "main" && (
                        <Tooltip title="lihat">
                          <IconButton
                            className="text-sky-500"
                            onClick={() => {
                              navigate(link + row.original.id);
                            }}
                          >
                            <ViewWeekIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {title === "thematic-data" && (
                        <Tooltip title="lihat">
                          <IconButton
                            className="text-sky-500"
                            onClick={() => {
                              navigate(link, {
                                state: {
                                  thematic_code: row.original.code_thematic,
                                },
                              });
                            }}
                          >
                            <ViewWeekIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {title === "topic-data" && (
                        <Tooltip title="lihat Detail">
                          <IconButton
                            className="text-sky-500"
                            onClick={() => {
                              navigate(link, {
                                state: {
                                  id: row.original.id,
                                },
                              });
                            }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Ubah">
                        <IconButton
                          className="text-yellow-500"
                          onClick={() => {
                            setOpenEdit(true);
                            setDataEdit(row.original);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      {title === "dataset" ? (
                        <Tooltip title="Delete">
                          <IconButton
                            className="text-rose-500"
                            onClick={() => {
                              setOpenConfirm(true);
                              setIdData(row.original.datasetId);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Delete">
                          <IconButton
                            className="text-rose-500"
                            onClick={() => {
                              setOpenConfirm(true);
                              setIdData(row.original.id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  ) : (
                    ""
                  )}
                  {/* {setOpen} */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex flex-col items-end mt-4">
        <p className="text-sm text-gray-700 text-center">
          Page{" "}
          <span className="font-semibold text-gray-900">
            {pageIndex + 1} of {pageOptions.length}{" "}
          </span>
        </p>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            className="inline-flex items-center px-4 py-2 text-xs font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            Prev
          </button>
          <button
            className="inline-flex items-center px-4 py-2 text-xs font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
