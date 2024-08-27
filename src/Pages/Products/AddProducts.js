import React, { useState, useEffect } from "react";
import axios from "axios";
import Drawer from "../../Components/Drawer";
import { Box, TextField } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  baseURL,
  PRODUCTS_CREATE,
  SALES_CENTERS,
  PRODUCTS,
  IMG_URL,
} from "../../Components/Api";
import { Loading } from "../../Components/Loading";

export default function AddProducts() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null,
    imageUrl: "",
    salesCenterId: "",
  });

  const [salesCenters, setSalesCenters] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { id } = location.state || {};
    if (id) {
      fetchProduct(id);
    } else {
      setLoading(false);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchSalesCenters = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/${SALES_CENTERS}`);
        setSalesCenters(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching sales centers:", error);
      }
    };

    fetchSalesCenters();
  }, []);

  const fetchProduct = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/${PRODUCTS}`);
      const product = response.data.find((product) => product.id === id);
      const completeImageUrl = `${IMG_URL}${product.imgUrl}`;
      setFormData({
        name: product.name,
        price: product.price,
        image: null,
        imageUrl: completeImageUrl,
        salesCenterId: product.salesCenterId,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching product:", error);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = "من فضلك ادخل الاسم";

    const price = parseFloat(formData.price);
    if (!formData.price) {
      newErrors.price = "من فضلك ادخل السعر";
    }
    else if (isNaN(price)) {
      newErrors.price = "يجب ان يكون السعر رقما";
    }
    else if (price <= 0) {
      newErrors.price = "يجب ان يكون السعر رقما اكبر من صفر";
    }

    if (!formData.image && !formData.imageUrl)
      newErrors.image = "من فضلك ادخل الصورة";
    if (!formData.salesCenterId)
      newErrors.salesCenterId = "من فضلك اختر المكان";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("Name", formData.name);
      formDataToSend.append("Price", formData.price);
      formDataToSend.append("SalesCenterId", formData.salesCenterId);

      if (formData.image) {
        formDataToSend.append("Image", formData.image);
      }

      let response;
      if (location.state && location.state.id) {
        response = await axios.put(
          `${baseURL}/${PRODUCTS}/${location.state.id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        localStorage.setItem("alertMessage", "تم تعديل المنتج بنجاح");
      } else {
        response = await axios.post(
          `${baseURL}/${PRODUCTS_CREATE}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data) {
          localStorage.setItem("alertMessage", "تم إضافة المنتج بنجاح");
        }
      }
      setLoading(false);
      navigate("/AllProducts");
    } catch (error) {
      setLoading(false);
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <Drawer />
      <Box height={65} sx={{ direction: "rtl" }} />
      <div>
        <Link to="/AllProducts">
          <button className="btn btn-primary add-button">رجوع</button>
        </Link>
      </div>
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div className="card table-style" style={{ direction: "rtl" }}>
          <div className="card-header d-flex table-head-style">
            اضف البيانات
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
                      <label htmlFor="price" className="d-flex">
                        السعر
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        aria-describedby="priceHelp"
                      />
                      {errors.price && (
                        <h6 className="error-log">{errors.price}</h6>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="salesCenterId" className="d-flex">
                      اختيار المكان
                    </label>
                    <TextField
                      id="salesCenterId"
                      select
                      name="salesCenterId"
                      value={formData.salesCenterId}
                      onChange={handleChange}
                      size="small"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">اختر المكان</option>
                      {salesCenters.map((center) => (
                        <option key={center.id} value={center.id}>
                          {center.name}
                        </option>
                      ))}
                    </TextField>
                    {errors.salesCenterId && (
                      <h6 className="error-log">{errors.salesCenterId}</h6>
                    )}
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
                          alt="Product"
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
