import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "../edit/formEdit.css";
import { useParams } from "react-router-dom";

const EditForm = ({ onUpdate }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    cuenta: "",
    kilos: "",
    fecha: "",
    usuario: "",
  });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isDataConfirmedModalOpen, setIsDataConfirmedModalOpen] = useState(false);
  const [dataToChange, setDataToChange] = useState(null);
  const navigate = useNavigate();

  const { cuenta, kilos, fecha, usuario } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const handleModalClose = () => {
    setIsSuccessModalOpen(false);
    setIsConfirmationModalOpen(false);
    setIsDataConfirmedModalOpen(false);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cuentaValue = parseInt(cuenta, 10);
      const kilosValue = parseFloat(kilos);
      const usuarioValue = parseInt(usuario, 10);

      const formattedFecha = new Date(fecha).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      if (!isNaN(cuentaValue) && !isNaN(kilosValue) && !isNaN(usuarioValue)) {
        setDataToChange({
          cuenta: cuentaValue,
          kilos: kilosValue,
          fecha: formattedFecha,
          usuario: usuarioValue,
        });
        setIsConfirmationModalOpen(true);
      } else {
        console.error("Error en la conversión de datos.");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error.message);
    }
  };

  const handleConfirmUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/update/${id}`, {
        ...dataToChange,
      });

      if (response.data.success) {
        console.log("Actualización exitosa:", response.data);
        onUpdate(response.data.updatedData);
        setIsSuccessModalOpen(true);
        setIsConfirmationModalOpen(false);
        setIsDataConfirmedModalOpen(true);
      }
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
          value={cuenta}
          onChange={handleChange}
          required
        />

        <label htmlFor="kilos">Kilos:</label>
        <input
          type="text"
          id="kilos"
          name="kilos"
          value={kilos}
          onChange={handleChange}
          required
        />

        <label>Fecha:</label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          value={fecha}
          onChange={handleChange}
          step="1"
          required
        />

        <label htmlFor="usuario">Usuario:</label>
        <input
          type="text"
          id="usuario"
          name="usuario"
          value={usuario}
          onChange={handleChange}
          required
        />

        <div className="form-buttons">
          <button type="submit">Update</button>
          <button type="button" onClick={handleBackClick}>
            Cancel
          </button>
          <button type="button" onClick={handleBackClick}>
            Volver
          </button>
        </div>
      </form>

      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Update Success Modal"
      >
        <h2>Actualización Exitosa</h2>
        <p>Datos actualizados con éxito.</p>
        <button onClick={handleModalClose}>Cerrar</button>
      </Modal>

      <Modal
        isOpen={isConfirmationModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Update Confirmation Modal"
      >
        <h2>Confirmación de Actualización</h2>
        <p>¿Quieres actualizar los siguientes datos?</p>
        <div>
          <strong>Cuenta:</strong> {dataToChange?.cuenta}
        </div>
        <div>
          <strong>Kilos:</strong> {dataToChange?.kilos}
        </div>
        <div>
          <strong>Fecha:</strong> {dataToChange?.fecha}
        </div>
        <div>
          <strong>Usuario:</strong> {dataToChange?.usuario}
        </div>
        <button type="button" onClick={handleConfirmUpdate}>
          Confirmar
        </button>
        <button onClick={handleModalClose}>Cancelar</button>
      </Modal>

      <Modal
        isOpen={isDataConfirmedModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Data Confirmed Modal"
      >
        <h2>Datos Confirmados</h2>
        <p>Los datos se han confirmado con éxito.</p>
        <button onClick={handleModalClose}>Aceptar</button>
      </Modal>
    </div>
  );
};

export default EditForm;
