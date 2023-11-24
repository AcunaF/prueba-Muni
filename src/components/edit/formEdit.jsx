import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../edit/formEdit.css";

const EditForm = ({ id, onUpdate }) => {
  const [formData, setFormData] = useState({
    cuenta: "",
    kilos: "",
    fecha: "",
    usuario: "",
  });
  const navigate = useNavigate();

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBackClick = () => {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/update/${id}`, {
        cuenta: parseInt(formData.cuenta, 10),
        kilos: parseFloat(formData.kilos),
        fecha: parseFloat(formData.fecha),
        usuario: parseFloat(formData.usuario),
      });
      console.log("Resultado:", response.data);
      // Llamar a la función onUpdate para actualizar el estado en el componente padre, por ejemplo
      onUpdate();
    } catch (error) {
      console.error("Error al enviar la solicitud:", error.message);
    }
  };

  return (
    <div className="edit-form-container">
      <h2>Edit Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cuenta">Cuenta:</label>
        <input
          type="text"
          id="cuenta"
          name="cuenta"
          value={formData.cuenta}
          onChange={handleChange}
          required
        />

        <label htmlFor="kilos">Kilos:</label>
        <input
          type="text"
          id="kilos"
          name="kilos"
          value={formData.kilos}
          onChange={handleChange}
          required
        />

        <label htmlFor="fecha">Fecha:</label>
        <input
          type="text"
          id="fecha"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />

        <label htmlFor="usuario">Usuario:</label>
        <input
          type="text"
          id="usuario"
          name="usuario"
          value={formData.usuario}
          onChange={handleChange}
          required
        />

        <div className="form-buttons">
          <button type="submit">Update</button>
          <button type="button" onClick={handleBackClick}>Cancel</button>
         
        </div>
      </form>
    </div>
  );
};

export default EditForm;
