import React from "react";
import DetailComponent from "@/pages/component/DetailComponent";
import { useGetCourseQuery, useGetEnrollmentQuery } from "@/feature/userApiSlice";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetCourseQuery(id, { refetchOnMountOrArgChange: true });
  const { data: enrollmentData } = useGetEnrollmentQuery({});

  // Check if enrollmentData is loaded and if enrollmentData.data is an array and if any enrollment's course matches id
  const isEnrolled =
    enrollmentData &&
    Array.isArray(enrollmentData.data) &&
    enrollmentData?.data?.some((enrollment) => enrollment.course === id);

  console.log(isEnrolled);

  return (
    <DetailComponent
      isEnrolled={isEnrolled}
      id={data?._id}
      DetailName={data?.type?.toString().toUpperCase() + " DETAIL"}
      courseDuration={data?.courseDuration + "DAYS"}
      description={data?.courseDescription}
      paragraph={data?.courseOverview}
      certification={data?.certification}
      price={data?.price}
      customizationfee="Rs 1000"
    />
  );
};

export default Details;
