import React, { useState, useEffect, useContext } from "react";
import MainLayout from "../components/layout/main";
import CourseItem from "../components/user/courseItem";
import AuthContext from "../context/AuthContext";
import { BACKEND_URI } from "../config/app";
import cookie from "cookie";
import refreshToken from "./api/refresh_token";

function user() {
  //Compile the local state needed to handle the user courses
  const [courseDetail, setCourseDetail] = useState([]);
  const [courseReady, setCourseReady] = useState(false);

  //Get the courses for the current user
  const {user: { courses }, } = useContext(AuthContext);

  const  fetchUserPaidCourses = async () =>{
    if (courses.length > 0) {
      const res = await fetch(`${BACKEND_URI}/courses/cart/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ cart: courses }),
      });

      if (res.ok) {
        const details = await res.json();

        setCourseDetail([...details.cart_detail]);

        setCourseReady(true);
      }
    }
  }
  //On succefull load update he user with the courses
  useEffect( () => {
    //Get all paid courses for the current user 
    fetchUserPaidCourses()
  }, []);

  return (
    <MainLayout>
      <section className="w-full py-14 md:py-20 bg-gray-900 pl-10">
        <h2 className="text-2xl md:text-3xl text-gray-100 font-medium">
          Your Courses
        </h2>
      </section>

      <section className="w-full flex justify-between pt-12 px-10  mb-20">
        <div className="w-11/12 md:w-8/12 mx-auto">
          <h3 className="text-lg my-2">{courses.length} Course</h3>

          {courseDetail.length > 0 && courseReady ? (
            <>
              {courseDetail.length
                ? courses.map((item, index) => {
                    const obj = courseDetail.find(
                      (detail) => item == detail.code
                    );

                    return <CourseItem key={index} course={obj} />;
                  })
                : ""}
            </>
          ) : (
            <h3 className="md:text-lg text-center"> You have no courses yet</h3>
          )}
        </div>
      </section>
    </MainLayout>
  );
}

export const getServerSideProps = async ({ req, res, query: { course_uuid },}) => {
  //Check cookies if noo avalable redirect to login.
  if (!req.headers.cookie) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  //If avalibale, Get refreshtoken
  let { refresh_token } = cookie.parse(req.headers.cookie);


  //
  if (!refresh_token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  //
  let { access_token } = cookie.parse(req.headers.cookie);
  //
  if (!access_token) {
    const refreshRes = await refreshToken(req, res);

    if (refreshRes) {
      access_token = refreshRes;
    } else {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }
  }
  //Return an empty prop list
  return {
    props: {},
  };
};

export default user;
