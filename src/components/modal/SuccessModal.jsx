import React from "react";
import Modal from "react-modal";

const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Update Success Modal">
      <h2>Actualización Exitosa</h2>
      <p>Datos actualizados con éxito.</p>
      <button onClick={onClose}>Cerrar</button>
    </Modal>
  );
};

export default SuccessModal;
