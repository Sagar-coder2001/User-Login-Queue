import './App.css';
import Dashboard from './Components/UserDashboard/Dashboard';
import Login from './Components/UserLogin/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Wrap the components in JSX */}
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      {/* <button id="install-button" style={{
        display: 'none',
        position: 'absolute',
        top: 50,
        left: 50
      }}>
        Add to Home Screen
      </button> */}
    </>
  );
}

export default App;
