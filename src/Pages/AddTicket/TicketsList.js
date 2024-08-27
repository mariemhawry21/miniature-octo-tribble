/* eslint-disable no-unused-vars */
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { baseURL, TICKETS } from "../../Components/Api";
import { Loading } from "../../Components/Loading";
import Swal from "sweetalert2";

export default function BasicTable() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/${TICKETS}`, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      setData(response.data);
    } catch (error) {
      setLoading(false);

      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const EditRow = (id) => {
    navigate(`/AddTicket`, { state: { id } });
  };

  const DeleteRow = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${baseURL}/${TICKETS}/${id}`);
      fetchData();
      setLoading(false);

      Swal.fire("تم الحذف بنجاح");

    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const currencyNames = {
    0: "دولار أمريكي",
    1: "يورو",
    2: "جنيه مصري",
    3: "جنيه إسترليني",
    4: "ريال سعودي",
    5: "درهم إماراتي",
    6: "دينار كويتي",
  };

  const dayNames = {
    Saturday: "السبت",
    Sunday: "الأحد",
    Monday: "الاثنين",
    Tuesday: "الثلاثاء",
    Wednesday: "الأربعاء",
    Thursday: "الخميس",
    Friday: "الجمعة",
  };

  return (
    <div>
      {loading && <Loading />}

      <TableContainer
        className="table-style table table-hover"
        sx={{ direction: "rtl" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table-head-style">
            <TableRow>
              <TableCell
                style={{ color: "#fff" }}
                sx={{ fontSize: "18px" }}
                align="right"
              >
                الاسم
              </TableCell>
              <TableCell
                style={{ color: "#fff" }}
                sx={{ fontSize: "18px" }}
                align="right"
              >
                نوع التذكرة
              </TableCell>
              <TableCell
                style={{ color: "#fff" }}
                sx={{ fontSize: "18px" }}
                align="right"
              >
                السعر
              </TableCell>
              <TableCell
                style={{ color: "#fff" }}
                sx={{ fontSize: "18px" }}
                align="right"
              >
                العملة
              </TableCell>
              <TableCell
                style={{ color: "#fff" }}
                sx={{ fontSize: "18px" }}
                align="right"
              >
                الضرائب
              </TableCell>

              <TableCell
                style={{ color: "#fff" }}
                sx={{ fontSize: "18px" }}
                align="right"
              >
                الأيام
              </TableCell>
              <TableCell
                style={{ color: "#fff" }}
                sx={{ fontSize: "18px" }}
                align="right"
              >
                الإجراءات
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((ticket) => (
                <TableRow
                  key={ticket.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ fontSize: "18px" }}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    {ticket.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px" }} align="right">
                    {ticket.categoryName}
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px" }} align="right">
                    {ticket.price}
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px" }} align="right">
                    {currencyNames[ticket.currency]}
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px" }} align="right">
                    {ticket.tax}
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px" }} align="right">
                    {ticket.days.map((day) => dayNames[day.name]).join(", ")}
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px" }} align="right">
                    <button
                      className="btn btn-primary ml-2"
                      onClick={() => EditRow(ticket.id)}
                    >
                      تعديل
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => DeleteRow(ticket.id)}
                    >
                      حذف
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <h5>لا توجد بيانات</h5>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
