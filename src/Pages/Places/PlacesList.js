/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { baseURL, IMG_URL, SALES_CENTERS } from "../../Components/Api";
import { useNavigate } from "react-router";
import { Loading } from "../../Components/Loading";
import Swal from "sweetalert2";

export default function PlacesList() {
  const [salesCenters, setSalesCenters] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/${SALES_CENTERS}`);
      setSalesCenters(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const EditRow = (id) => {
    navigate(`/AddPlaces`, { state: { id } });
  };

  const DeleteRow = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete(`${baseURL}/${SALES_CENTERS}/${id}`);
      fetchData();
      setLoading(false);
      Swal.fire("تم الحذف بنجاح");
    } catch (error) {
      setLoading(false);
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="container">
      {loading && <Loading />}

      <div className="row product-edit ml-4">

        {salesCenters.length === 0 ? (
          <h4 className="text-center font-weight-bold bg-light px-5 py-3">لا توجد اماكن </h4>
        ) : (

          salesCenters.map((center) => (
            <div className="col-md-4" key={center.id}>
              <Card sx={{ maxWidth: 300 }} className="mb-5">
                <img
                  style={{ width: "80%", height: "250px", objectFit: "cover", marginLeft: "10%" }}
                  src={`${IMG_URL}${center.imgUrl}`}
                  alt={center.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {center.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {center.productCount} Products
                  </Typography>
                  <div className="d-flex justify-content-between mt-2">
                    <button
                      className="btn btn-primary ml-2"
                      onClick={() => EditRow(center.id)}
                    >
                      تعديل
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => DeleteRow(center.id)}
                    >
                      حذف
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
