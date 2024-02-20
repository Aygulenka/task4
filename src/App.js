import HomePage from './HomePage';
import './App.css';
import Registration from './Registartion';
import Login from './Login';
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
<Routes>
  <Route path='/' element={<Registration/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/Home' element={<HomePage/>}/>
</Routes>
  );
}

export default App;
