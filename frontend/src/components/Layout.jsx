import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
const Layout = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main
        className="w-full h-full flex-grow bg-white overflow-scroll md:px-10 lg:px-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
