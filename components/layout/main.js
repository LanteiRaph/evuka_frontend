import React, { useEffect } from "react";
import { Footer } from "../footer";
import  {NavBar}  from "../nav";
import { ToastContainer} from 'react-toastify'

const MainLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen font-sans text-gray-900">
      <NavBar />
      <ToastContainer autoClose={10000} />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
