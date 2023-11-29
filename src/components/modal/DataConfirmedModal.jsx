import React from "react";
import Modal from "react-modal";


const DataConfirmedModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Data Confirmed Modal">
      <h2>Datos Confirmados</h2>
      <p>Los datos se han confirmado con éxito.</p>
      <button onClick={onClose}>Aceptar</button>
    </Modal>
  );
};

export default DataConfirmedModal;
