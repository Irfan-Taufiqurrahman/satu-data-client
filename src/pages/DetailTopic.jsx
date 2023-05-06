import React from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getDetailTopicData } from "../api/topicdata";
import InputDetail from "../components/InputDetail";
import { Button } from "@mui/material";
import Loading from "../components/Loading";

const DetailTopic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const topicData = useQuery("topic", () =>
    getDetailTopicData(location.state.id)
  );
  return (
    <div>
      <div className="text-center font-bold pb-2 text-xl text-gray-800">
        Detail
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      {topicData.isLoading ? (
        <Loading />
      ) : (
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
            <InputDetail
              label="Code Topic"
              value={topicData.data?.data?.code_topic}
            />
            <InputDetail
              label="Code Thematic"
              value={topicData.data?.data?.thematic_code}
            />
            <InputDetail
              label="Sumber Data"
              value={topicData.data?.data?.sumber_data}
            />
            <InputDetail
              label="Penanggung Jawab"
              value={topicData.data?.data?.penanggungjawab}
            />
            <div className="md:col-span-2">
              <InputDetail
                label="Kinerja Utama"
                value={topicData.data?.data?.kinerja_utama}
              />
            </div>
          </div>

          <div className="">
            <Button
              variant="contained"
              className="bg-gray-500"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailTopic;
