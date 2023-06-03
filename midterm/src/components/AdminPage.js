import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Record from "./app/Record";

const AdminPage = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving records:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then((response) => {
        // Update the list of records after deletion
        setRecords(records.filter((record) => record.id !== id));
        toast.info("Xoá thành công");
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
  };

  return (
    <div className="container-fluid">
      <h1 className="mt-5 mb-4">Admin Dashboard</h1>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Data Table</h5>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Color</th>
                  <th>Category</th>
                  <th>Expiry Date</th>
                  <th>Origin</th>
                  <th>Description</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <Record key={record.id}
                  id = {record.id} 
                  name= {record.name} 
                  price ={record.price} 
                  image = {record.image} 
                  color = {record.color}
                  category = {record.name_category}
                  expiryDate={record.expiry_date}
                  origin={record.origin}
                  description={record.description}
                  path={`update/${record.id}`}
                  onDelete = {() => handleDelete(record.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <ToastContainer />
        </div>
      </div>

      <div className="mt-3">
        <Link to="/add" className="btn btn-success">
          Add
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
