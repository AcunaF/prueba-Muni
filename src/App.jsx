import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Formulario from "./components/Alta/formularioAlta";
import BuscarCuentaPorId from "./components/buscar/buscar";
import EditForm from "./components/edit/formEdit";
import DeleteUser from "./components/delete/delete";
import onUpdate from "./components/edit/formEdit";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuscarCuentaPorId />} />
        <Route path="/altaUsuario" element={<Formulario />} />
        <Route path="/edit/:id" element={<EditForm onUpdate= {onUpdate} />} />

        <Route path="/delete" element={<DeleteUser />} />
      </Routes>
    </Router>
  );
};

export default App;
