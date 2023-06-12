import React from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getDetailSubTopicData } from "../api/subtopicdata";
import InputDetail from "../components/InputDetail";
import { Button } from "@mui/material";
import Loading from "../components/Loading";

const DetailSubTopic = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const subTopicData = useQuery("topic", () =>
      getDetailSubTopicData(location.state.id)
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
                value={subTopicData.data?.data?.code_subtopic}
              />
              <InputDetail
                label="Code Thematic"
                value={subTopicData.data?.data?.topic_code}
              />
              <InputDetail
                label="Sumber Data"
                value={subTopicData.data?.data?.formula}
              />
              <div className="md:col-span-2">
                <InputDetail
                  label="Kinerja Utama"
                  value={subTopicData.data?.data?.indikator_kinerja_utama}
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
  
  export default DetailSubTopic;