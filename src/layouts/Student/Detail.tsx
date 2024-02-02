import React from "react";

import DetailComponent from "@/pages/component/DetailComponent";
import { useGetCourseQuery } from "@/feature/userApiSlice";
import { useParams } from "react-router-dom";

const Details = () => {
  const {id} = useParams<{id:string}>();
  const {data} = useGetCourseQuery(id,{refetchOnMountOrArgChange:true});
  
  return (
    <DetailComponent
      DetailName={data?.type?.toString().toUpperCase() + " DETAIL"}
      paragraph={data?.courseOverview}
      certification={data?.certification}
      price={data?.price}
      customizationfee="Rs 1000"
    ></DetailComponent>
  );
};

export default Details;
