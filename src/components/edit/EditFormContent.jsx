import React from "react";
import "./formEdit.css";


const EditFormContent = ({ formData, onChange, onSubmit, onCancel }) => {
  const { cuenta, kilos, fecha, usuario } = formData;

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="cuenta">Cuenta:</label>
      <input type="text" id="cuenta" name="cuenta" value={cuenta} onChange={onChange} required />

      <label htmlFor="kilos">Kilos:</label>
      <input type="text" id="kilos" name="kilos" value={kilos} onChange={onChange} required />

      <label>Fecha:</label>
      <input type="date" id="fecha" name="fecha" value={fecha} onChange={onChange} step="1" required />

      <label htmlFor="usuario">Usuario:</label>
      <input type="text" id="usuario" name="usuario" value={usuario} onChange={onChange} required />

      <div className="form-buttons">
        <button type="submit">Update</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" onClick={onCancel}>
          Volver
        </button>
      </div>
    </form>
  );
};

export default EditFormContent;
