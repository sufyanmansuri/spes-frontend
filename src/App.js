import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/signin'
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
