import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cuentas  from "./components/cuentas/cuentas";
import Formulario from "./components/Alta/formularioAlta";
import BuscarCuentaPorId from "./components/buscar/buscar";
import EditForm from "./components/edit/formEdit";
import DeleteUser from "./components/delete/delete";
import onUpdate from "./components/edit/formEdit";
import "./App.css";
import LoginForm from "./components/login/loginForm";
import CreateAccount from "./components/login/create-account";


const App = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleNavigate = (route, component) => {
    setActiveComponent(component);
    route();
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Cuentas onNavigate={(route) => handleNavigate(route, "cuentas")} />} />
          <Route
            path="/buscar/:id"
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
          <Route path ="/login" element = {<LoginForm onNavigate ={(route) => handleNavigate (route, "LoginForm" )}/>}/>
          
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>

      {activeComponent === "BuscarCuentaPorId" && <BuscarCuentaPorId />}
      {activeComponent === "Formulario" && <Formulario />}
      {activeComponent === "EditForm" && <EditForm onUpdate={onUpdate} />}
      {activeComponent === "DeleteUser" && <DeleteUser />}
      {activeComponent === "LoginForm" && <LoginForm />}
      {activeComponent === "CreateAccount" && <CreateAccount />}
    </div>
  );
};

export default App;
