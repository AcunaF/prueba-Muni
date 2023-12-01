import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { convertirFechaISOaFormatoCorto } from "../../util/fecha";
import "./buscar.css"

const BuscarCuentaPorId = () => {
  const [idBusqueda, setIdBusqueda] = useState("");
  const [cuentaEncontrada, setCuentaEncontrada] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setIdBusqueda(e.target.value);
  };

  const handleBuscarClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/getdatabyid/${idBusqueda}`);
      setCuentaEncontrada(response.data[0]);
      setError(null);
    } catch (error) {
      console.error("Error al buscar la cuenta:", error);
      setError("Error al buscar la cuenta. Por favor, verifica el ID.");
      setCuentaEncontrada(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCrearClick = () => {
    navigate("/altaUsuario");
  };

  const handleEditarClick = () => {
    navigate(`/edit/:id${cuentaEncontrada.ID}`);
  };

  
  

  const BackClick = () => {
    navigate("/");
  };

  const DeleteClick = () => {
    navigate("/delete", { state: { id: cuentaEncontrada.ID } });
  };

  return (
    <div className="max-w-2xl mx-auto p-8 border rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Buscar Cuenta por ID</h2>
      <label className="block mb-4">
        ID a buscar:
        <input
          type="text"
          value={idBusqueda}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </label>
      <button
        type="button"
        onClick={handleBuscarClick}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
      >
        Buscar
      </button>
      <button
        type="button"
        onClick={handleCrearClick}
        className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
      >
        Crear
      </button>

      {loading && <p className="text-blue-500 mt-4">Cargando...</p>}

      {cuentaEncontrada && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Resultado:</h3>
          <p>ID: {cuentaEncontrada.ID}</p>
          <p>Cuenta: {cuentaEncontrada.CUENTA}</p>
          <p>Kilos: {cuentaEncontrada.KILOS}</p>
          <p>Fecha: {convertirFechaISOaFormatoCorto(cuentaEncontrada.FECHA)}</p>

          <p>Usuario: {cuentaEncontrada.USUARIO}</p>
          <button
            type="button"
            onClick={handleEditarClick}
            className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={DeleteClick}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
          >
            Eliminar
          </button>
          <button
            type="button"
            onClick={BackClick}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Volver
          </button>
        </div>
      )}

      {error && <p style={{ color: "red" }} className="mt-4">{error}</p>}
    </div>
  );
};

export default BuscarCuentaPorId;
