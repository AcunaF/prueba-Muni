import React, { useState } from "react";
import "../buscar/buscar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { convertirFechaISOaFormatoCorto } from "../../util/fecha";


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

      console.log("Resultado:", response.data[0]);
      
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
    // Redirigir a la ruta /altaUsuario
    navigate("/altaUsuario");
  };

  const handleEditarClick = () => { 
    navigate("/edit");
  }

  const BackClick = () => {
    navigate("/");
  }
  const EliminarClick = () => {
    navigate("/delete");
  }

  return (
    <div>
      <h2>Buscar Cuenta por ID</h2>
      <label>
        ID a buscar:
        <input type="text" value={idBusqueda} onChange={handleInputChange} />
      </label>
      <button type="button" onClick={handleBuscarClick}>
        Buscar
      </button>
      <button type="button" onClick={handleCrearClick}>
        Crear
      </button>

      {loading && <p>Cargando...</p>}

      {cuentaEncontrada && (
        <div>
          <h3>Resultado:</h3>
          <p>ID: {cuentaEncontrada.ID}</p>
          <p>Cuenta: {cuentaEncontrada.CUENTA}</p>
          <p>Kilos: {cuentaEncontrada.KILOS}</p>
          <p>Fecha: {convertirFechaISOaFormatoCorto(cuentaEncontrada.FECHA)}</p>


          <p>Usuario: {cuentaEncontrada.USUARIO}</p>
          <button type="button" onClick={handleEditarClick}>Editar</button>
          <button type="button" onClick={EliminarClick}>Eliminar</button>
          <button type="button" onClick={BackClick}>Volver</button>
        </div>
        
      )}
     

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default BuscarCuentaPorId;
