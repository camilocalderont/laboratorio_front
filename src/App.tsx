import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainButtons from './components/dashboard/MainButtons';
import PacienteForm from './views/PacienteForm';
import EstudioForm from './views/EstudioForm';


// Aquí puedes importar tus otros formularios...

const { PUBLIC_URL } = process.env;

function App() {
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<MainButtons />} />
        <Route path="/registro-pacientes" element={<PacienteForm />} />
        <Route path="/registro-estudio" element={<EstudioForm />} /> 

        {/* <Route path="/consulta-pacientes" element={<ConsultaPacientes />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
