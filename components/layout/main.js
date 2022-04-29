import React, { useEffect } from "react";
import { Footer } from "../footer";
import  {NavBar}  from "../nav";


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
