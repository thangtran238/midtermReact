import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const UpdatePage = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [updatedForm, setUpdatedForm] = useState({
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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => {
        const data = res.data;
        setRecord(data);
        setUpdatedForm({
          name: data.name,
          price: data.price,
          image: data.image,
          color: data.color,
          category: data.category,
          expiryDate: data.expiryDate,
          origin: data.origin,
          description: data.description,
        });
      })
      .catch((error) => {
        console.error("Error retrieving record:", error);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedRecord = {
      name: updatedForm.name,
      price: updatedForm.price,
      image: updatedForm.image,
      color: updatedForm.color,
      name_category: updatedForm.category,
      expiry_date: updatedForm.expiryDate,
      origin: updatedForm.origin,
      description: updatedForm.description,
    };

    axios
      .put(`http://localhost:3000/products/${id}`, updatedRecord)
      .then((response) => {
        setTimeout(toast.success("Cập nhật sản phẩm thành công"),5000);
        window.location.href = '/';

      })
      .catch((error) => {
        console.error("Error updating record:", error);

      });
  };
  const handleChange = (e) => {
    const { name, type, value } = e.target;
    if (name === "tinhtranghang") {
      setUpdatedForm({
        ...updatedForm,
        [name]: value === "true" ? true : false,
      });
    } else {
      setUpdatedForm({
        ...updatedForm,
        [name]:
          type === "file"
            ? imageRef.current.value.replace(/C:\\fakepath\\/i, "image")
            : value,
      });
    }
  };
  
  const handleClear = () => {
    setUpdatedForm({
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

  if (!record) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Update Record</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Add Record</h5>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Tên Sản phẩm:</label>
              <input
                type="text"
                name="name"
                value={updatedForm.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Giá Sản phẩm ($):</label>
              <input
                type="number"
                name="price"
                value={updatedForm.price}
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
              name="category"
              value={updatedForm.category}
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
                value={updatedForm.color}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Nguyên liệu:</label>
              <input
                type="text"
                name="material"
                value={updatedForm.material}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Hạn sử dụng:</label>
              <input
                type="date"
                name="expiryDate"
                value={updatedForm.expiryDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Xuất xứ:</label>
              <input
                type="text"
                name="origin"
                value={updatedForm.origin}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <label>Tình trạng hàng:</label>
            <select
              className="form-control"
              name="tinhtranghang"
              value={updatedForm.tinhtranghang}
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
                value={updatedForm.description}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Update
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

export default UpdatePage;
