import Header from "../components/Header/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">
        Made by Akash Mahto LinkedIn
      </div>
      {/* <footer></footer> */}
    </div>
  );
};

export default AppLayout;
