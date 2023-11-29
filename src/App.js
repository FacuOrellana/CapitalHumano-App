import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar/ResponsiveAppBar';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Inicio from './pages/Inicio/Inicio';
import ListadoEmplados from './pages/Empleados/ListadoEmpleados';
import NewEmpleado from './pages/Empleados/NewEmpleado';


export const rootPath = '/App';

function App() {
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Switch>
        <Route path={'/login'} >
          <Login />
        </Route>
        <Route path={'/inicio'}>
          <Inicio></Inicio>
        </Route>
        <Route path={'/Empleados/newempleado'} >
          <NewEmpleado></NewEmpleado>
        </Route>
        <Route path={'/empleados'}>
          <ListadoEmplados></ListadoEmplados>
        </Route>

      </Switch>
    </>
  );
}

export default App;
