import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cuentas  from "./components/cuentas/cuentas";
import Formulario from "./components/Alta/formularioAlta";
import BuscarCuentaPorId from "./components/buscar/buscar";
import EditForm from "./components/edit/formEdit";
import DeleteUser from "./components/delete/delete";
import onUpdate from "./components/edit/formEdit";

const App = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleNavigate = (route, component) => {
    setActiveComponent(component);
    route();
  };

  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Cuentas onNavigate={(route) => handleNavigate(route, "cuentas")} />} />
          <Route
            path="/buscar"
            element={<BuscarCuentaPorId onNavigate={(route) => handleNavigate(route, "BuscarCuentaPorId")} />}
          />
          <Route
            path="/altaUsuario"
            element={<Formulario onNavigate={(route) => handleNavigate(route, "Formulario")} />}
          />
          <Route
            path="/edit/:id"
            element={<EditForm onUpdate={onUpdate} onNavigate={(route) => handleNavigate(route, "EditForm")} />}
          />
          <Route path="/delete" element={<DeleteUser onNavigate={(route) => handleNavigate(route, "DeleteUser")} />} />
        </Routes>
      </Router>

      {activeComponent === "BuscarCuentaPorId" && <BuscarCuentaPorId />}
      {activeComponent === "Formulario" && <Formulario />}
      {activeComponent === "EditForm" && <EditForm onUpdate={onUpdate} />}
      {activeComponent === "DeleteUser" && <DeleteUser />}
    </div>
  );
};

export default App;
