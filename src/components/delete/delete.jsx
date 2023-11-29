import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../delete/delete.css";

const DeleteUser = ({ onUpdate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state ? location.state.id : null;

  console.log("id en DeleteUser:", id);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const response = await axios.delete(`http://localhost:3000/delete/${id}`);
        console.log("Resultado:", response);
        onUpdate();
        navigate("/");
      } else {
        console.error("ID es undefined.");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error.message);
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="edit-form-container">
      <h2>Delete Form</h2>
      <form onSubmit={handleDelete}>
        <button type="submit">Delete</button>
     
      <button type="button" onClick={handleBackClick}>
        Back
      </button>
      </form>
    </div>
  );
};

export default DeleteUser;
