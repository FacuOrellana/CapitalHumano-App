import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar/ResponsiveAppBar';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Inicio from './pages/Inicio/Inicio';
import ListadoEmplados from './pages/Empleados/ListadoEmpleados'; 
import NewEmpleado from './pages/Empleados/NewEmpleado';


export const rootPath ='/App';

function App() {
  return (
    <HashRouter>
    <ResponsiveAppBar></ResponsiveAppBar>
    <Switch>
      <Route path={'/Login'}>
        <Login></Login>
      </Route>
      <Route path={rootPath+'/Inicio'}>
        <Inicio></Inicio>
      </Route>
      <Route path={rootPath+'/Empleados/NewEmpleado'}>
        <NewEmpleado></NewEmpleado>
      </Route>
      <Route path={rootPath+'/Empleados'}>
        <ListadoEmplados></ListadoEmplados>
      </Route>
    
    </Switch>
  </HashRouter>
  );
}

export default App;
