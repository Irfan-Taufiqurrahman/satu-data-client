import React from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getTheamticData } from "../api/theamticdata";

const TheamticData = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery("theamticData", () =>
    getTheamticData(id)
  );
  return <div>TheamticData {id}</div>;
};

export default TheamticData;
