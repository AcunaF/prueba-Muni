import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../delete/delete.css";

const DeleteUser = ({ id, onUpdate }) => {

    const navigate = useNavigate();
    
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.delete(`http://localhost:3000/delete/${id}`);
        console.log("Resultado:", response.data);
        // Llamar a la función onUpdate para actualizar el estado en el componente padre, por ejemplo
        onUpdate();
        } catch (error) {
        console.error("Error al enviar la solicitud:", error.message);
        }
    };
    
    const handleBackClick = () => {
        navigate("/");
    }
    
    return (
        <div className="edit-form-container">
        <h2>Delete Form</h2>
        <form onSubmit={handleDelete}>
            <button type="submit" onClick={handleDelete}>
            Delete
            </button>
            <button type="button" onClick={handleBackClick}>
            Back
            </button>
        </form>
        </div>
    );

};

export default DeleteUser;
