import { useRouter } from "next/router";
import Image from "next/image";
import React, { useState } from "react";
import {MdOutlineCastForEducation } from "react-icons/md";
import Typed from "react-typed";

const Header = () => {
  const [term, setTerm] = useState("");
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/search/${term}`);
  };
  return (
    <div className="px-4 py-2 mx-auto mx-w-7xl">
      <div className="flex flex-col-reverse items-center md:flex-row lg:items-end">
        <div className="text-center md:pb-12 md:w-1/2 md:text-left">
          <h1 className="pt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight whitespace-nowrap">
            Learn at you comfort <br />
            it's your {'   '}
            <Typed
              strings={["Space", "Time", "Value"]}
              typeSpeed={150}
              backSpeed={100}
              loop
              className="whitespace-nowrap text-purple-600"
            />
          </h1>
          <p className="pt-8 sm:text-lg max-w-md font-normal text-gray-600 leading-relaxed flex ">
           Select from 1000 plus course from any topic and learn at your ouwn time.
            <MdOutlineCastForEducation className="w-16 h-16 color-green" />
          </p>
          <div className="flex flex-col pt-8 space-y-4 md:space-x-6 md:space-y-0 items-center w-full md:flex-row">
            <button className="flex justify-center items-center w-full md:w-auto h-16 px-8 bg-purple-600 font-medium text-white rounded-xl whitespace-nowrap hover:shadow-primary transition-shadow duration-300">
              View Course
            </button>
            <button className="flex justify-center items-center w-full md:w-auto h-16 px-8 font-medium text-gray-900 border border-gray-900 rounded-xl whitespace-nowrap hover:shadow-xl transition-shadow duration-300">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex items-end w-1/2">
          <Image src={"/assets/banner.svg"} width={900} height={600} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
