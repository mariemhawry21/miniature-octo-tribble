/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Drawer from "../../Components/Drawer";
import { Box, TextField } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseURL, CRUISES, CRUISES_CREATE } from "../../Components/Api";
import { Loading } from "../../Components/Loading";

export default function AddCruises() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });

  useEffect(() => {
    const { id } = location.state || {};
    if (id) {
      fetchCruiseDetails(id);
    } else {
      setLoading(false);
    }
  }, [location.state]);

  const fetchCruiseDetails = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/cruises`);
      const cruise = response.data.find((cruise) => cruise.id === id);
      if (cruise) {
        const { name, status } = cruise;
        setFormData({ name, status });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching cruise details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = "من فضلك ادخل الاسم";
    if (!formData.status) newErrors.status = "من فضلك اختر الحالة";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name,
        status: formData.status === "Active" ? 1 : 2,
      };

      if (location.state && location.state.id) {
        // Editing existing Cruise
        await axios.put(
          `${baseURL}/${CRUISES}/${location.state.id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        localStorage.setItem("alertMessage", "تم تعديل المركب بنجاح");
      } else {
        await axios.post(
          `${baseURL}/${CRUISES_CREATE}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        localStorage.setItem("alertMessage", "تم إضافة المركب بنجاح");
      }
      navigate("/AllCruises");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error adding cruise:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <Drawer />
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div>
          <h2 className="add-head">المراكب</h2>
          <Link to="/AllCruises">
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
                    <label htmlFor="status" className="d-flex">
                      الحالة
                    </label>
                    <TextField
                      id="status"
                      name="status"
                      select
                      value={formData.status}
                      onChange={handleChange}
                      size="small"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">اختر الحالة</option>
                      <option value="Active">نشط</option>
                      <option value="InActive">غير نشط</option>
                    </TextField>
                    {errors.status && (
                      <h6 className="error-log">{errors.status}</h6>
                    )}
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
