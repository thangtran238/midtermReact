import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddPage = ({ match, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    color: "",
    category: "",
    expiryDate: "",
    origin: "",
    description: "",
  });

  const imageRef = useRef(null);

  const handleChange = (event) => {
    const { name, type, value } = event.target;
    if (name === "tinhtranghang") {
      setFormData({
        ...formData,
        [name]: value === "true" ? true : false,
      });
    } else {
      setFormData({
      ...formData,
      [name]: type === "file" ? imageRef.current.value.replace(/C:\\fakepath\\/i, "image") : value,
    });
    } 
  };

  useEffect(() => {
    if (match) {
      const id = match.params.id;
      axios({
        method: "GET",
        url: `http://localhost:3000/products/${id}`,
        data: null,
      })
        .then((res) => {
          const data = res.data;
          setFormData({
            ...formData,
            id: data.id,
            name: data.name,
            price: data.price,
            image: data.image,
            color: data.color,
            name_category: data.name_category,
            material: data.material,
            expiry_date: data.expiry_date,
            origin: data.origin,
            description: data.description,
            tinhtranghang: data.tinhtranghang,
          });
        })
        .catch((err) => {});
    }
  }, [match]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      price,
      image,
      name_category,
      color,
      material,
      expiry_date,
      origin,
      description,
      tinhtranghang,
    } = formData;

    
      if (!name || !price) {
        toast.warn("Vui lòng nhập đủ nội dung");
      } else {
        axios({
          method: "POST",
          url: "http://localhost:3000/products",
          data: {
            name,
            price,
            image,
            color,
            name_category,
            material,
            expiry_date,
            origin,
            description,
            tinhtranghang,
          },
        })
          .then((res) => {
            setTimeout(toast.success("Thêm sản phẩm thành công"),5000);
            window.location.href = '/';
          })
          .catch((err) => {});
      }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      price: "",
      image: "",
      color: "",
      category: "",
      expiryDate: "",
      origin: "",
      description: "",
    });
    toast.info("Cleared form");
  };

  return (
    <div className="container-fluid">
      <h1 className="mt-5 mb-4">Add Page</h1>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Add Record</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tên Sản phẩm:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Giá Sản phẩm ($):</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Chọn Ảnh:</label>
              <input
                type="file"
                name="image"
                ref={imageRef}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <label>Loại sản phẩm:</label>
            <select
              className="form-control"
              name="name_category"
              value={formData.name_category}
              onChange={handleChange}
              required="required"
            >
              <option value="sản phẩm mới">mới</option>
              <option value="sản phẩm hot">hot</option>
              <option value="sản phẩm khuyến mãi">khuyến mãi</option>
            </select>
            <div className="form-group">
              <label>Màu bánh:</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Nguyên liệu:</label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Hạn sữ dụng:</label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Xuất xứ:</label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <label>Tình trạng hàng:</label>
            <select
              className="form-control"
              name="tinhtranghang"
              value={formData.tinhtranghang}
              onChange={handleChange}
              required="required"
            >
              <option value={true}>Còn hàng</option>
              <option value={false}>Hết hàng</option>
            </select>
            <div className="form-group">
              <label>Mô tả:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Add Record
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default AddPage;
