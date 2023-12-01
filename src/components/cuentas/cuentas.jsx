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
      setCuentas(response.data.data || []);
      setError(null);
    } catch (error) {
      console.error("Error al buscar las cuentas:", error);
      setError(
        "Error al buscar las cuentas. Por favor, verifica la solicitud."
      );
      setCuentas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = () => {
    navigate("/altaUsuario");
    console.log(`Crear cuenta`);
  }
  const handleEdit = (id) => {
    navigate("/edit/:id", { state: { id } });
    console.log(`Editar cuenta con ID: ${id}`);
  };
  const FindById = (id) => {
    navigate(`/buscar/${id}`);
  };

  const handleDelete = (id) => {
    navigate("/delete", { state: { id } });
    console.log(`Eliminar cuenta con ID: ${id}`);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3">
              ID{" "}
              <button
                onClick={() => FindById()}
                className="btn btn-primary mr-4"
              > Buscar por ID
              </button>
            </th>
            <th className="px-6 py-3">CUENTAS
             <button
                onClick={() => handleCreate()}
                className="btn btn-primary mr-4"
              > Crear cuenta
              </button>
            </th>
            <th className="px-6 py-3">KILOS</th>
            <th className="px-6 py-3">
              FECHAS
              </th>
            <th className="px-6 py-3">USUARIOS</th>
            <th className="px-6 py-3">ACCIONES</th>
          </tr>
        </thead>

        <tbody>
          {cuentas.map((cuenta, index) => (
            <tr
              key={cuenta.ID || index}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="px-6 py-4 font-medium">{cuenta.ID}</td>
              <td className="px-6 py-4">{cuenta.CUENTA}</td>
              <td className="px-6 py-4">{cuenta.KILOS}</td>
              <td className="px-6 py-4">{cuenta.FECHA}</td>
              <td className="px-6 py-4">{cuenta.USUARIO}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleEdit(cuenta.ID)}
                  className="btn btn-primary mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cuenta.ID)}
                  className="btn btn-primary"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuscarCuentas;
