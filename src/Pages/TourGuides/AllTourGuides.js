import React, { useEffect } from "react";
import Drawer from "../../Components/Drawer";

import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import TourGidesList from "./TourGuidesList";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllTourGuides() {
  useEffect(() => {
    const alertMessage = localStorage.getItem("alertMessage");
    if (alertMessage) {
      toast.success(alertMessage);
      setTimeout(() => {
        localStorage.removeItem("alertMessage");
      }, 2000);
    }
  }, []);
  return (
    <div>
      <Drawer />
      <ToastContainer />
      <Box sx={{ width: "80%" }}>
        <div>
          <h2 className="table-head">المرشدين</h2>
          <Link to="/AddTOurGuides">
            <button className="btn btn-primary add-button">اضافه مرشد</button>
          </Link>
        </div>

        <TourGidesList />
      </Box>
    </div>
  );
}
