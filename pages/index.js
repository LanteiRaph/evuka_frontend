// import Head from 'next/head'
// import Image from 'next/image'

import MainLayout from "../components/layout/Main";
import Header from "../components/index/Header";
import CourseSuggest from '../components/index/CourseSuggest'
import CourseList from "../components/index/CourseList";
import CategoryList from '../components/index/CategoryList'
import Teach from '../components/index/Teach'
import { BACKEND_URI } from "../config/app";

export default function Home({ data }) {
  return (
    <MainLayout>
      <Header />
      <CourseSuggest data={data}/>
      <CourseList data={data}/>
      <CategoryList data={data} />
      <Teach/>
    </MainLayout>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const resAPI = await fetch(`${BACKEND_URI}/courses/`);

  if (!resAPI.ok) {
    return {
      props: {},
    };
  }
  const data = await resAPI.json();

  console.log(data)

  return {
    props: { data },
  };
};
