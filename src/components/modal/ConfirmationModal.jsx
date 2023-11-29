import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";




const ConfirmationModal = ({ isOpen, onClose, onConfirm, dataToChange }) => {
  const navigate = useNavigate();

  const BackClick = () => {
    navigate("/");
  };
  
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Update Confirmation Modal">
      <h2>Confirmación de Actualización</h2>
      <p>¿Quieres actualizar los siguientes datos?</p>
      <div>
      <strong>Datos a actualizar:</strong>
      <pre>{JSON.stringify(dataToChange, null, 2)}</pre>
    </div>

      <button type="button" onClick={onConfirm}>
        Confirmar
      </button >

      <button onClick={onClose}>Cancelar</button>

      <button onClick={BackClick}>Volver</button>
    </Modal>
  );
};

export default ConfirmationModal;



  
    
      


