import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar/ResponsiveAppBar';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Inicio from './pages/Inicio/Inicio';
import ListadoEmplados from './pages/Empleados/ListadoEmpleados';
import NewEmpleado from './pages/Empleados/NewEmpleado';
import EditEmpleado from './pages/Empleados/EditEmpleado';
import ListadoContratos from './pages/Contratos/ListadoContratos';
import ListadoAreas from './pages/Areas/ListadoAreas';
import NewArea from './pages/Areas/NewArea';
import EditArea from './pages/Areas/EditArea';
import ListadoSindicatos from './pages/Sindicato/ListadoSindicatos';
import NewSindicato from './pages/Sindicato/NewSindicato';



//export const rootPath = '/App';

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path='/entrada' element={<Login />} />
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/empleados' element={<ListadoEmplados />} />
        <Route path='/empleados/newempleado' element={<NewEmpleado />} />
        <Route exact path={'/empleados/:id'} element={<EditEmpleado />} />
        <Route path='/contratos' element={<ListadoContratos />} />
        <Route path='/areas' element={<ListadoAreas />} />        
        <Route path='/areas/newarea' element={<NewArea />} />        
        <Route exact path={'/areas/:id'} element={<EditArea />} />        
        <Route path='/sindicatos' element={<ListadoSindicatos />} />        
        <Route path='/sindicatos/newsindicato' element={<NewSindicato />} />
      </Routes>
    </>
  );
}

export default App;
