import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import EditFormContent from "./EditFormContent";
import SuccessModal from "../modal/SuccessModal";
import ConfirmationModal from "../modal/ConfirmationModal";
import DataConfirmedModal from "../modal/DataConfirmedModal";

const EditForm = ({ onUpdate }) => {
  const [isDataConfirmed, setIsDataConfirmed] = useState(false);

  const { id } = useParams();
  const [formData, setFormData] = useState({
    cuenta: "",
    kilos: "",
    fecha: "",
    usuario: "",
  });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isDataConfirmedModalOpen, setIsDataConfirmedModalOpen] =
    useState(false);
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
        setIsDataConfirmed(true); // Nuevo estado
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error.message);
    }
  };

  return (
    <div className="edit-form-container">
      <h2>Edit Form</h2>
      <EditFormContent
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleBackClick}
      />

      <SuccessModal isOpen={isSuccessModalOpen} onClose={handleModalClose} />
      {isDataConfirmed && (
        <DataConfirmedModal
          isOpen={true /* o utiliza el estado adecuado */}
          onClose={handleModalClose}
        />
      )}

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirmUpdate}
        dataToChange={dataToChange}
      />
      <DataConfirmedModal
        isOpen={isDataConfirmedModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default EditForm;
