/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Drawer from "../../Components/Drawer";
import { Box, FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseURL, TOURGUIDE, TOURGUIDE_CREATE } from "../../Components/Api";
import { Loading } from "../../Components/Loading";

export default function AddTourGuides() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "",
    phoneNumber: "",
    profitRate: "",
  });
  const location = useLocation();

  useEffect(() => {
    const { id } = location.state || {};
    if (id) {
      fetchTourGuideDetails(id);
    } else {
      setLoading(false);
    }
  }, [location.state]);

  const fetchTourGuideDetails = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/${TOURGUIDE}/${id}`);
      setFormData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("There was an error fetching the tour guide details!", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const phoneNumberPattern = /^(012|010|011|015)\d{8}$/;

    if (!formData.name) newErrors.name = "من فضلك ادخل الاسم";
    if (!formData.email) newErrors.email = " من فضلك ادخل البريد الالكتروني";
    if (!formData.status) newErrors.status = "من فضلك اختر الحالة ";
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "من فضلك ادخل رقم الهاتف";
    } else if (!phoneNumberPattern.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "رقم الهاتف يجب أن يبدأ بـ 012 أو 010 أو 011 أو 015 ويكون 11 رقم";
    }
    const profitRate = parseFloat(formData.profitRate);
    if (!formData.profitRate) {
      newErrors.profitRate = "من فضلك ادخل نسبة الربح";
    }
    if (profitRate > 100) {
      newErrors.profitRate = "يجب أن تكون رقمًا أقل من أو تساوي 100";
    }
    if (profitRate <= 0) {
      newErrors.profitRate = "يجب أن تكون رقمًا أكبر من صفر";
    }
    if (isNaN(profitRate)) {
      newErrors.profitRate = "يجب أن تكون رقمًا";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        profitRate: formData.profitRate,
        status: formData.status === "Active" ? 1 : 2,
      };

      if (location.state && location.state.id) {
        // Editing existing tour guide
        await axios.put(`${baseURL}/tour-guides/${location.state.id}`, payload, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        localStorage.setItem("alertMessage", "تم تعديل المرشد بنجاح");
      } else {
        const response = await axios.post(`${baseURL}/tour-guides/create`, payload, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (response.data) {
          localStorage.setItem("alertMessage", "تم إضافة المرشد بنجاح");
        }
      }
      navigate("/AllTourGuides");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("There was an error adding the tour guide!", error);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <Drawer />
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div>
          <h2 className="add-head">المرشدين</h2>
          <Link to="/AllTourGuides">
            <button className="btn btn-primary add-button">رجوع </button>
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
                      <label htmlFor="name" className="d-flex">الاسم</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.name && <h6 className="error-log">{errors.name}</h6>}
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email" className="d-flex">البريد الالكتروني</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.email && <h6 className="error-log">{errors.email}</h6>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="status" className="d-flex">الحاله</label>
                    <select
                      className="form-control"
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="">اختر الحالة</option>
                      <option value="Active">نشط</option>
                      <option value="Inactive">غير نشط</option>
                    </select>
                    {errors.status && <h6 className="error-log">{errors.status}</h6>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="d-flex">رقم الهاتف</label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size="small"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    {errors.phoneNumber && <h6 className="error-log">{errors.phoneNumber}</h6>}
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="profitRate" className="d-flex">نسبة الربح</label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size="small"
                        id="profitRate"
                        name="profitRate"
                        value={formData.profitRate}
                        onChange={handleInputChange}
                        startAdornment={<InputAdornment position="start">%</InputAdornment>}
                      />
                    </FormControl>
                    {errors.profitRate && <h6 className="error-log">{errors.profitRate}</h6>}
                  </div>
                </div>
              </div>
              <button style={{ fontSize: "20px" }} type="submit" className="btn btn-primary mt-4">حفظ</button>
            </form>
          </div>
        </div>
      </Box>
    </div>
  );
}
