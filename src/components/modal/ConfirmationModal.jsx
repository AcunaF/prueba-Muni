import React from "react";
import Modal from "react-modal";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, dataToChange }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Update Confirmation Modal">
      <h2>Confirmación de Actualización</h2>
      <p>¿Quieres actualizar los siguientes datos?</p>
     
      <button type="button" onClick={onConfirm}>
        Confirmar
      </button>
      <button onClick={onClose}>Cancelar</button>
    </Modal>
  );
};

export default ConfirmationModal;
