import React from "react";
import { Link } from "react-router-dom";
const Record = ({
  id,
  name,
  price,
  image,
  color,
  category,
  expiryDate,
  origin,
  description,
  path,
  onDelete,
}) => {

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>
        <img className="img-fluid rounded shadow" src={image} alt="" width={50} height={50}/>
      </td>
      <td>{color}</td>
      <td>{category}</td>
      <td>{expiryDate}</td>
      <td>{origin}</td>
      <td>{description}</td>
      <td>
        <Link to={path} className="btn btn-primary me-2">
          Update
        </Link>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Record;
