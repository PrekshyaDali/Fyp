import React from "react";

import DetailComponent from "@/pages/component/DetailComponent";
import { useGetCourseQuery } from "@/feature/userApiSlice";
import { useParams } from "react-router-dom";

const Details = () => {
  const {id} = useParams<{id:string}>();
  const {data} = useGetCourseQuery(id,{refetchOnMountOrArgChange:true});
  // console.log(data.courseDescription,"data")
  console.log(data);
  return (
    <DetailComponent
      id = {data?._id}
      DetailName={data?.type?.toString().toUpperCase() + " DETAIL"}
      courseDuration={data?.courseDuration + "DAYS"}
      description = {data?.courseDescription}  
      paragraph={data?.courseOverview}
      certification={data?.certification}
      price={data?.price}
      customizationfee="Rs 1000"
      
    ></DetailComponent>
  );
};

export default Details;
