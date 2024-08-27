/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Drawer from "../../Components/Drawer";
import { Box, TextField } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  baseURL,
  IMG_URL,
  SALES_CENTERS,
  SALES_CENTERS_CREATE,
} from "../../Components/Api";
import { Loading } from "../../Components/Loading";

export default function AddPlaces() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image: null,
    imageUrl: "",
  });

  useEffect(() => {
    const { id } = location.state || {};
    if (id) {
      fetchPlace(id);
    } else {
      setLoading(false);

    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
        imageUrl: URL.createObjectURL(files[0]),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const fetchPlace = async (id) => {
    try {
      setLoading(true);

      const response = await axios.get(`${baseURL}/${SALES_CENTERS}`);
      const center = response.data.find((center) => center.id === id);
      const completeImageUrl = `${IMG_URL}${center.imgUrl}`;
      setFormData({
        name: center.name,
        location: center.location,
        image: null,
        imageUrl: completeImageUrl,
      });
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.error("Error fetching center:", error);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = "من فضلك ادخل الاسم";
    if (!formData.location) newErrors.location = "من فضلك ادخل الموقع";
    if (!formData.image && !formData.imageUrl)
      newErrors.image = "من فضلك ادخل الصورة";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("Name", formData.name);
      formDataToSend.append("Location", formData.location);
      if (formData.image) {
        formDataToSend.append("Image", formData.image);
      }

      if (location.state && location.state.id) {
        const response = await axios.put(
          `${baseURL}/${SALES_CENTERS}/${location.state.id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        localStorage.setItem("alertMessage", "تم تعديل مركز البيع بنجاح");
      } else {
        const response = await axios.post(
          `${baseURL}/${SALES_CENTERS_CREATE}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data) {
          localStorage.setItem("alertMessage", "تم إضافة مركز البيع بنجاح");
        }
      }
      setLoading(false);

      navigate("/AllPlaces");
    } catch (error) {
      setLoading(false);

      console.error("Error adding or editing place:", error);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <Drawer />
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div>
          <h2 className="add-head">مراكز البيع</h2>
          <Link to="/AllPlaces">
            <button className="btn btn-primary add-button">رجوع</button>
          </Link>
        </div>
        <div className="card table-style" style={{ direction: "rtl" }}>
          <div className="card-header d-flex table-head-style">
            <h3>اضف البيانات</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name" className="d-flex">
                        الاسم
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-describedby="nameHelp"
                      />
                      {errors.name && (
                        <h6 className="error-log">{errors.name}</h6>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="location" className="d-flex">
                        الموقع
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        aria-describedby="locationHelp"
                      />
                      {errors.location && (
                        <h6 className="error-log">{errors.location}</h6>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="image" className="d-flex">
                        اضافة صورة
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={handleChange}
                        aria-describedby="imageHelp"
                      />
                      {errors.image && (
                        <h6 className="error-log">{errors.image}</h6>
                      )}
                      {formData.imageUrl && (
                        <img
                          src={formData.imageUrl}
                          alt="sales-center"
                          style={{
                            marginTop: "10px",
                            width: "100px",
                            height: "100px",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                حفظ
              </button>
            </form>
          </div>
        </div>
      </Box>
    </div>
  );
}
