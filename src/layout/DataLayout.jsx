import React from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";
import { Card, CardContent } from "@mui/material";

const DataLayout = () => {
  return (
    <div className="">
      <main className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar />
        <div className="flex flex-col w-full">
          {/* Navbar */}
          <Navbar />
          <div className="md:p-10 p-4 bg-gray-50 w-full h-full flex-grow">
            <Card className="shadow-lg overflow-hidden pb-24">
              <CardContent>
                <Outlet />
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col w-full ">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataLayout;
