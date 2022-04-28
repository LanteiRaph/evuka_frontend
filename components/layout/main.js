import React, { useEffect } from "react";
import { Footer } from "../Footer";
import  {NavBar}  from "../Nav";


const MainLayout = ({ children }) => {
  return (
    <div className="">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
