import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../cuentas/cuentas.css";

const BuscarCuentas = () => {
  const navigate = useNavigate();
  const [cuentas, setCuentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/getdata");
      console.log("Respuesta del servidor:", response.data);
      setCuentas(response.data);
      setError(null);
    } catch (error) {
      console.error("Error al buscar las cuentas:", error);
      setError("Error al buscar las cuentas. Por favor, verifica la solicitud.");
      setCuentas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const BackClick = () => {
    navigate("/buscar");
  };

  //retorna en cards los datos que se encuentran en la base de datos
 return (

  <div className="container">
  <div className="row">
    <div className="col-md-12">
      <div className="card mt-4">
        <div className="card-header">
          <h2>Lista de Cuentas</h2>
        </div>
        <div className="card-body">
          <button className="btn btn-primary" onClick={BackClick}>
            Volver
          </button>
          <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>CUENTA</th>
                    <th>Correo</th>
                    <th>KILOS</th>
                    <th>FECHA</th>
                    <th>USUARIO</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {cuentas.map((cuenta) => (
                    <tr key={cuenta.id}>
                      <td>{cuenta.ID}</td>
                      <td>{cuenta.CUENTA}</td>
                      <td>{cuenta.KILOS}</td>
                      <td>{cuenta.FECHA}</td>
                      <td>{cuenta.USUARIO}</td>
                      <td>
                        <button className="btn btn-danger">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          {loading && (
            <div className="alert alert-info">Buscando cuentas...</div>
          )}
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  </div>
</div>
);
};
         
// ID: 85, CUENTA: 65, KILOS: 65, FECHA: '2023-11-28T03:00:00.000Z', USUARIO: 65
export default BuscarCuentas;
