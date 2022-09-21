import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  return (
    <div className="App" data-theme="light">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login_user" element={<Login />} />
        <Route path="register_user" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
