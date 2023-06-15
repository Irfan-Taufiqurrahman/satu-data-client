import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getAllPerhitungan } from "../api/perhitungan";
import BarChart from "../components/BarChart";
import { useState } from "react";
import Loading from "../components/Loading";

const ChartPerhitungan = () => {
  const perhitungans = useQuery("perhitungan", getAllPerhitungan);
  const [dataChart, setDataChart] = useState();
  useEffect(() => {
    if (perhitungans.isSuccess) {
      setDataChart({
        labels: perhitungans?.data?.map((perhitungan) => perhitungan.tahun),
        datasets: [
          {
            label: "Hasil",
            data: perhitungans?.data?.map((perhitungan) => perhitungan.value),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      });
    }
  }, [perhitungans.data, perhitungans.isSuccess]);
  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        Diagram Perhitungan
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      <div className="flex justify-center">
        <div className="w-8/12 ">
          {dataChart ? <BarChart chartData={dataChart} /> : <Loading />}
        </div>
      </div>
    </div>
  );
};

export default ChartPerhitungan;
