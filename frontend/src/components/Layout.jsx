import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
const Layout = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen min-w-screen">
      <Header />
      <Outlet className="w-full h-full flex-grow overflow-scroll md:px-10 lg:px-20" />
      <Footer />
    </div>
  );
};

export default Layout;
