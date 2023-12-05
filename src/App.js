import './App.css';
import ResponsiveInicioBar from './components/ResponsiveAppBar/ResponsiveInicioBar';
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
import ListadoObraSocial from './pages/ObraSocial/ListadoObraSocial';
import NewObraSocial from './pages/ObraSocial/NewObraSocial';


//export const rootPath = '/App';

function App() {
  return (
    <>
      <ResponsiveInicioBar />
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/entrada' element={<Inicio />} />
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
        <Route path='/obrasociales' element={<ListadoObraSocial />} />
        <Route path='/obrasociales/newobrasocial' element={<NewObraSocial />} />
        {/* <Route path='/*' element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
