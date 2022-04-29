import React from "react";
import MainLayout from "../../../components/layout/main";
import Banner from "../../../components/courses/detail/Banner";
import WhatLearnt from "../../../components/courses/detail/WhatLearnt";
import CourseDetail from "../../../components/courses/detail/CourseDetail";
import Description from "../../../components/courses/detail/Description";
import FeedBack from "../../../components/courses/detail/FeedBack";
import { BACKEND_URI } from "../../../config/app";

const course_uuid = ({ data }) => {
  const banner_data = {
    title: data.title,
    description: data.description,
    rating: data.student_rating,
    number_of_rating: data.student_rating_no,
    author: data.author.name,
    price: data.price,
    student_no: data.student_no,
  };
  return (
    <MainLayout>
      <Banner data={banner_data} />
      <WhatLearnt />
      <CourseDetail
        sections={data.sections}
        total_length={data.total_length}
        total_lectures={data.total_episodes}
      />
      <Description info={data.description} />
      <FeedBack comments={data.comment} />
    </MainLayout>
  );
};

export const getServerSideProps = async ({ req, res, query: { code } }) => {
  console.log(code)
  const resAPI = await fetch(`${BACKEND_URI}/courses/detail/${code}/`);

 
  if (!resAPI.ok) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const data = await resAPI.json();

  return {
    props: { data },
  };
};

export default course_uuid;
