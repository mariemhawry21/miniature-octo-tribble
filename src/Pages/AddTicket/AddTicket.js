/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Drawer from "../../Components/Drawer";
import {
  baseURL,
  CATEGORIES,
  TICKETS,
  TICKETS_CREATE,
} from "../../Components/Api";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  OutlinedInput,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Loading } from "../../Components/Loading";

export default function AddTicket() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    tax: "",
    categoryId: "",
    currency: "",
    days: [],
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const { id } = location.state || {};
    if (id && !loading) {
      fetchTicketDetails(id);
    }
  }, [location.state, loading]);

  const fetchTicketDetails = async (id) => {
    try {
      const response = await axios.get(`${baseURL}/${TICKETS}`);
      const ticket = response.data.find((ticket) => ticket.id === id);
      if (ticket) {
        const { name, price, tax, categoryName, currency, days } = ticket;
        const category = categories.find((cat) => cat.title === categoryName);

        setFormData({
          title: name,
          price: price,
          tax: tax,
          categoryId: category ? category.id : '',
          currency: currency,
          days: days.map((day) => day.id) || [],
        });
      }
    } catch (error) {
      console.log("Error fetching data of ticket:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseURL}/${CATEGORIES}`);
      setCategories(response.data);
      setLoading(false);
    } catch {
      console.log("Error fetching categories");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const dayValue = parseInt(value, 10);
      setFormData((prevState) => {
        if (checked) {
          return { ...prevState, days: [...prevState.days, dayValue] };
        } else {
          return {
            ...prevState,
            days: prevState.days.filter((day) => day !== dayValue),
          };
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title) newErrors.title = "من فضلك ادخل الاسم";

    const price = parseFloat(formData.price);
    if (isNaN(price)) {
      newErrors.price = "من فضلك ادخل السعر";
    }
    if (price <= 0) {
      newErrors.price = "يحب ان يكون السعر رقما اكبر من صفر";
    }

    const tax = parseFloat(formData.tax);
    if (isNaN(tax)) {
      newErrors.tax = "من فضلك ادخل الضرائب";
    }
    if (tax <= 0) {
      newErrors.tax = "يجب أن تكون رقمًا أكبر من صفر";
    }

    if (!formData.categoryId) newErrors.categoryId = "من فضلك اختر نوع التذكرة";
    if (!formData.currency && !location.state) newErrors.currency = "من فضلك اختر العملة";
    if (formData.days.length === 0) newErrors.days = "من فضلك اختر اليوم";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        tax: parseFloat(formData.tax),
        currency: formData.currency ? parseInt(formData.currency, 10) : undefined,
        days: formData.days.map((day) => parseInt(day, 10)),
      };

      if (location.state && location.state.id) {
        const response = await axios.put(
          `${baseURL}/${TICKETS}/${location.state.id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        localStorage.setItem("alertMessage", "تم تعديل التذكرة بنجاح");
      } else {
        const response = await axios.post(
          `${baseURL}/${TICKETS_CREATE}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data) {
          localStorage.setItem("alertMessage", "تم إضافة التذكرة بنجاح");
        }
      }

      setLoading(false);
      navigate("/AllTickets");
    } catch (error) {
      setLoading(false);
      console.error("There was an error adding the ticket!", error);
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

  return (
    <div>
      {loading && <Loading />}
      <Drawer />
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div>
          <h2 className="add-head">اضف التذاكر</h2>
          <Link to="/AllTickets">
            <button className="btn btn-primary add-button">رجوع </button>
          </Link>
        </div>
        <div className="card table-style mb-5" style={{ direction: "rtl" }}>
          <div className="card-header d-flex table-head-style">
            <h4>اضف البيانات</h4>
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
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-control"
                        id="name"
                      />
                      {errors.title && (
                        <h6 className="error-log">{errors.title}</h6>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="categoryId" className="d-flex">
                      نوع التذكرة
                    </label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">اختر نوع التذكرة</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                    {errors.categoryId && (
                      <h6 className="error-log">{errors.categoryId}</h6>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="price" className="d-flex">
                      السعر
                    </label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size="small"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </FormControl>
                    {errors.price && (
                      <h6 className="error-log">{errors.price}</h6>
                    )}
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="tax" className="d-flex">
                      الضرائب
                    </label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size="small"
                        id="tax"
                        name="tax"
                        value={formData.tax}
                        onChange={handleChange}
                      />
                    </FormControl>
                    {errors.tax && <h6 className="error-log">{errors.tax}</h6>}
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="currency" className="d-flex">
                      العملة
                    </label>
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">اختر العملة</option>
                      {Object.entries(currencyNames).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                    {errors.currency && (
                      <h6 className="error-log">{errors.currency}</h6>
                    )}
                  </div>

                  <div className="col-md-12">
                    <label className="d-flex mt-3">اختر اليوم</label>
                    <div className="col-md-12 d-flex">
                      <FormGroup className="d-flex col-md-3">
                        <div className="col-md-2">
                          <FormControlLabel
                            className="d-flex"
                            name="days"
                            value="1"
                            control={
                              <Checkbox
                                onChange={handleChange}
                                checked={formData.days.includes(1)}
                              />
                            }
                            label="السبت"
                          />
                        </div>
                        <div className="col-md-2">
                          <FormControlLabel
                            className="d-flex"
                            name="days"
                            value="2"
                            control={
                              <Checkbox
                                onChange={handleChange}
                                checked={formData.days.includes(2)}
                              />
                            }
                            label="الاحد"
                          />
                        </div>
                      </FormGroup>
                      <FormGroup className="d-flex col-md-3">
                        <div className="col-md-2">
                          <FormControlLabel
                            className="d-flex"
                            name="days"
                            value="3"
                            control={
                              <Checkbox
                                onChange={handleChange}
                                checked={formData.days.includes(3)}
                              />
                            }
                            label="الاثنين"
                          />
                        </div>
                        <div className="col-md-2">
                          <FormControlLabel
                            className="d-flex"
                            name="days"
                            value="4"
                            control={
                              <Checkbox
                                onChange={handleChange}
                                checked={formData.days.includes(4)}
                              />
                            }
                            label="الثلاثاء"
                          />
                        </div>
                      </FormGroup>
                      <FormGroup className="d-flex col-md-3">
                        <div className="col-md-2">
                          <FormControlLabel
                            className="d-flex"
                            name="days"
                            value="5"
                            control={
                              <Checkbox
                                onChange={handleChange}
                                checked={formData.days.includes(5)}
                              />
                            }
                            label="الاربعاء"
                          />
                        </div>
                        <div className="col-md-2">
                          <FormControlLabel
                            className="d-flex"
                            name="days"
                            value="6"
                            control={
                              <Checkbox
                                onChange={handleChange}
                                checked={formData.days.includes(6)}
                              />
                            }
                            label="الخميس"
                          />
                        </div>
                      </FormGroup>
                      <FormGroup className="d-flex col-md-3">
                        <div className="col-md-2">
                          <FormControlLabel
                            className="d-flex"
                            name="days"
                            value="7"
                            control={
                              <Checkbox
                                onChange={handleChange}
                                checked={formData.days.includes(7)}
                              />
                            }
                            label="الجمعه"
                          />
                        </div>
                      </FormGroup>
                    </div>
                    {errors.days && (
                      <h6 className="error-log">{errors.days}</h6>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                style={{ fontSize: "20px" }}
                className="btn btn-primary mt-4"
              >
                حفظ
              </button>
            </form>
          </div>
        </div>
      </Box>
    </div>
  );
}
