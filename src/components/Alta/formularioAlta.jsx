import React, { useState } from "react";
import "./formsAlta.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Indica al modal el elemento principal de la aplicación

const Formulario = () => {
    const [cuenta, setCuenta] = useState("");
    const [kilo, setKilo] = useState("");
    const [usuario, setUsuario] = useState("");
    const [fecha, setFecha] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const handleCuentaChange = (e) => {
        setCuenta(e.target.value);
    };

    const handleKiloChange = (e) => {
        setKilo(e.target.value);
    };

    const handleUsuarioChange = (e) => {
        setUsuario(e.target.value);
    };

    const handleFechaChange = (e) => {
        setFecha(e.target.value);
    };

    const handleCrearClick = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:3000/create", {
                cuenta: cuenta,
                kilos: kilo,
                usuario: usuario,
                fecha: fecha,
            });
            setUserData(response.data);
            setSuccessModalIsOpen(true);
            setError(null);
        } catch (error) {
            console.error("Error al crear la cuenta:", error);
            setError("Error al crear la cuenta. Por favor, verifica los datos.");
        } finally {
            setLoading(false);
        }
    };

    const BackClick = () => {
        navigate("/");
    };

    const closeSuccessModal = () => {
        setSuccessModalIsOpen(false);
        // Puedes realizar alguna acción adicional después de cerrar el modal si es necesario
    };

    return (
        <div>
            <h2>Crear Cuenta</h2>
            <label>
                Cuenta:
                <input type="text" value={cuenta} onChange={handleCuentaChange} />
            </label>
            <label>
                Kilo:
                <input type="text" value={kilo} onChange={handleKiloChange} />
            </label>
            <label>
                Usuario:
                <input type="text" value={usuario} onChange={handleUsuarioChange} />
            </label>
            <label>
                Fecha:
                <input type="date" value={fecha} onChange={handleFechaChange} />
            </label>
            <button type="button" onClick={handleCrearClick} disabled={loading}>
                {loading ? "Creando..." : "Crear"}
            </button>
            <button type="button" onClick={BackClick}>
                Volver
            </button>

            <Modal
                isOpen={successModalIsOpen}
                onRequestClose={closeSuccessModal}
                contentLabel="Usuario Creado Exitosamente"
            >
                <h2>Usuario Creado Exitosamente</h2>
                {userData && (
                    <div>
                        <p>Detalles del usuario:</p>
                        <pre>{JSON.stringify(userData, null, 2)}</pre>
                    </div>
                )}
                <button onClick={closeSuccessModal}>Cerrar</button>
            </Modal>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Formulario;
