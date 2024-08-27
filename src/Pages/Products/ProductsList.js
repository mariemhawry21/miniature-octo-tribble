/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { baseURL, IMG_URL, PRODUCTS, SALES_CENTERS } from "../../Components/Api";
import { useNavigate } from "react-router";
import { Loading } from "../../Components/Loading";
import Swal from "sweetalert2";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [center, setCenter] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/${PRODUCTS}`);
      setProducts(response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchSalesCenters = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`${baseURL}/${SALES_CENTERS}`);
  //     setCenter(response.data);
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchData();
    // fetchSalesCenters();
  }, []);

  const EditRow = (id) => {
    navigate(`/AddProducts`, { state: { id } });
  };

  const DeleteRow = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${baseURL}/${PRODUCTS}/${id}`
      );
      fetchData();
      Swal.fire("تم الحذف بنجاح");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error deleting data:", error);
    }
  };


  return (
    <div className="container">
      {loading && <Loading />}

      <div className="row product-edit ml-4">
        {products.length === 0 ? (
          <h4 className="text-center font-weight-bold bg-light px-5 py-3">لا توجد منتجات </h4>
        ) : (
          products.map((product) => (
            <div className="col-md-4" key={product.id}>
              <Card sx={{ maxWidth: 300 }} className="mb-5">
                <div>
                  <img
                    style={{ width: "80%", height: "250px", marginLeft: "10%" }}
                    src={`${IMG_URL}${product.imgUrl}`}
                    alt={product.name}
                  />
                </div>
                <CardContent>

                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {`$ ${product.price}`}
                  </Typography>

                  <Typography color="text.secondary">
                    {product.SalesCenterId}
                  </Typography>
                  <div className="d-flex justify-content-between mt-2">
                    <button
                      className="btn btn-primary ml-2"
                      onClick={() => EditRow(product.id)}
                    >
                      تعديل
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => DeleteRow(product.id)}
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
