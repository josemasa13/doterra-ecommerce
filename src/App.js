import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Dashboard from './admin/Dashboard'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'

function Error(){
  return (
    <div>
      <h1>Error, no se ha encontrado la página que buscas</h1>
      <h2>Ir a la página de <Link to='/'>Inicio</Link></h2>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Route exact path='/'>
        <Redirect to='/productos' />
      </Route>

      <Route exact path='/productos'>
        <Dashboard main="productos"/>
      </Route>

      <Route exact path='/eventos'>
        <Dashboard main="eventos"/>
      </Route>

      <Route>
        <Error />
      </Route>
    </Router>
    
  );
}

export default App;
