import React, { useState } from "react";
import SalesBarChart from "./SaleBarChart";
import Drawer from "../../Components/Drawer";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import PeopleIcon from "@mui/icons-material/People";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import BasicPie from "./Chart1";
const Home = () => {
  const [startDate, setStartDate] = useState("2023-05-01");
  const [endDate, setEndDate] = useState("2024-07-21");

  const theme = useTheme();
  const isMobileOrMedium = useMediaQuery(theme.breakpoints.down("md"));

  const data = {
    labels: [
      "01-05-2023",
      "02-05-2023",
      "03-05-2023",
      "04-05-2023",
      "05-05-2023",
      "05-05-2023",
      "05-05-2023",
      "05-05-2023",
      "05-05-2023",
      "05-05-2023",
      "05-05-2023",
      "05-05-2023",
      "05-05-2023",
      "01-05-2023",
      "02-05-2023",
      "03-05-2023",
      "04-05-2023",
      "05-05-2023",
      "05-05-2023",
      "05-05-2023",
      "05-05-2023",
      "05-05-2023",
      "05-05-2023",
      // Add more dates as needed
    ],
    datasets: [
      {
        label: "Tickets Sold",
        data: [
          20, 40, 30, 50, 60, 70, 80, 90, 100, 20, 40, 30, 50, 60, 70, 80, 90,
          100, 20, 40, 30, 50, 60, 70, 80, 90, 100,
        ], // Add more ticket data as needed
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const pastelColors = ["#FFD1DC", "#FFDEAD", "#E0BBE4", "#C6E2FF"];
  const paperData = [
    { label: "عائليه", count: 26, icon: <FamilyRestroomIcon /> },
    { label: "ضيافه", count: 49, icon: <PeopleIcon /> },
    { label: "تذكره الجمعه", count: 49, icon: <ConfirmationNumberIcon /> },
    { label: "كبير", count: 41, icon: <AccessibilityIcon /> },
  ];

  return (
    <>
      <Drawer />
      <div
        style={{
          padding: "0 60px",
          fontFamily: "Arial, sans-serif",
          marginRight: isMobileOrMedium ? "0" : "240px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <h3>Today's Sales</h3>

        <div
          style={{
            display: "flex",
            justifyContent: isMobileOrMedium ? "center" : "space-between",
            flexDirection: isMobileOrMedium ? "column" : "row",
            marginTop: "10px",
          }}
        >
          {paperData.map((item, index) => (
            <Paper
              key={index}
              style={{
                textAlign: "center",
                backgroundColor: pastelColors[index % pastelColors.length],
                padding: "10px",
                borderRadius: "15px",
                width: isMobileOrMedium ? "100%" : "20%",
                marginBottom: isMobileOrMedium ? "10px" : "0",
                transition: "background-color 0.3s ease",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
              elevation={2}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#FFE4E1")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  pastelColors[index % pastelColors.length])
              }
            >
              <>{item.icon}</>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h2>{item.label}</h2>
                <p>{item.count}</p>
              </div>
            </Paper>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "20px",
            flexDirection: isMobileOrMedium ? "column" : "row",
          }}
        >
          <label style={{ width: isMobileOrMedium ? "100%" : "50%" }}>
            From:
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "15px",
                border: "1px solid grey",
                padding: "20px",
                marginBottom: isMobileOrMedium ? "10px" : "0",
              }}
            />
          </label>
          <label
            style={{
              width: isMobileOrMedium ? "100%" : "50%",
              marginLeft: isMobileOrMedium ? "0" : "10px",
            }}
          >
            To:
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "15px",
                border: "1px solid grey",
                padding: "20px",
              }}
            />
          </label>
        </div>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            width: "100%",
            alignItems: "center",
            flexDirection: isMobileOrMedium ? "column" : "row",
            heigh: "100%",
          }}
        >
          <SalesBarChart data={data} />
          <BasicPie />
        </div>
      </div>
    </>
  );
};

export default Home;
