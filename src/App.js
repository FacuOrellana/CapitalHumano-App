import './App.css';
import ResponsiveInicioBar from './components/ResponsiveAppBar/ResponsiveInicioBar';
import { Route, Routes } from 'react-router-dom';
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
import EditObraSocial from './pages/ObraSocial/EditObraSocial';
import NewObraSocial from './pages/ObraSocial/NewObraSocial';
import EditSindicato from './pages/Sindicato/EditSindicato';
import ListadoPuestoTrabajo from './pages/PuestoTrabajo/ListadoPuestoTrabajo';
import NewPuestoTrabajo from './pages/PuestoTrabajo/NewPuestoTrabajo';
import EditPuestoTrabajo from './pages/PuestoTrabajo/EditPuestoTrabajo';
import ListadoHabilidad from './pages/Habilidades/ListadoHabilidad';
import NewHabilidad from './pages/Habilidades/NewHabilidad';
import EditHabilidad from './pages/Habilidades/EditHabilidad';
import ListadoTipoExperiencia from './pages/TiposExperiencias/ListadoTipoExperiencia';
import NewTipoExperiencia from './pages/TiposExperiencias/NewTipoExperiencia';
import EditTipoExperiencia from './pages/TiposExperiencias/EditTipoExperiencia';
import NewContrato from './pages/Contratos/NewContrato';
import EditContrato from './pages/Contratos/EditContrato';




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
        <Route path='/contratos/newcontrato' element={<NewContrato />} />
        <Route path='/areas' element={<ListadoAreas />} />
        <Route path='/areas/newarea' element={<NewArea />} />
        <Route exact path={'/areas/:id'} element={<EditArea />} />
        <Route path='/sindicatos' element={<ListadoSindicatos />} />
        <Route path='/sindicatos/newsindicato' element={<NewSindicato />} />
        <Route path='/obrasociales' element={<ListadoObraSocial />} />
        <Route path='/obrasociales/newobrasocial' element={<NewObraSocial />} />        
        <Route path='/obrasociales/:id' element={<EditObraSocial />} />
        <Route exact path={'/obrasociales/:id'} element={<EditObraSocial />} />
        <Route exact path={'/sindicatos/:id'} element={<EditSindicato />} />
        <Route path='/puestotrabajo' element={< ListadoPuestoTrabajo />} />        
        <Route path='/puestotrabajo/newpuestotrabajo' element={<NewPuestoTrabajo />} />
        <Route exact path={'/puestotrabajo/:id'} element={<EditPuestoTrabajo />} />        
        <Route path='/habilidad' element={< ListadoHabilidad />} />        
        <Route path='/habilidad/newhabilidad' element={<NewHabilidad />} />
        <Route exact path={'/habilidad/:id'} element={<EditHabilidad />} />        
        <Route path='/tipoexperiencia' element={< ListadoTipoExperiencia />} />        
        <Route path='/tipoexperiencia/newtipoexperiencia' element={<NewTipoExperiencia />} />
        <Route exact path={'/tipoexperiencia/:id'} element={<EditTipoExperiencia />} />
        <Route exact path={'/contratos/:id'} element={<EditContrato />} />
        

      </Routes>
    </>
  );
}

export default App;
