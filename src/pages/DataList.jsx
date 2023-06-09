import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { pendudukMiskin, bulog } from "../data/datalist";
import DataTable from "../components/DataTable";
import { useMutation, useQuery } from "react-query";
import { getAllDetailData } from "../api/Dataset";
import Loading from '../components/Loading';

const DataList = () => {
  const location = useLocation();
  // console.log(location.state.id);
  const datalist = useQuery("datalist", () =>
    getAllDetailData(location.state.id)
  );
  const columns = useMemo(
    () => [
      datalist.data?.var?.map((variable, index) => ({
        Header: variable.name.toLowerCase().replace(/\s/g, ""),
        accessor: variable.name.toLowerCase().replace(/\s/g, ""),
      })),
    ],
    [datalist.data]
    ); 
    
    const dataTable = useMemo(() => datalist.data?.data, [datalist.data]);
    // console.log(dataTable);

  // console.log(columns);
  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        DataList
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      {datalist.isLoading ? <Loading /> : <DataTable columns={columns[0]} data={dataTable} />}
      
    </div>
  );
};

export default DataList;
