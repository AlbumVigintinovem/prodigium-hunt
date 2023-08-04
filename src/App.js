import './App.css';
import './style.css'
import SiteProvider, { useSiteContext } from './context/SiteContext';
import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { Link, Route, Routes } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import SignUp from './components/SignUp';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Ders from './components/Ders';
import Castle from './components/Castle';
import Logout from './components/Logout';


function App() {

  return (
    <>

      {localStorage.getItem("userId") === null ?
        <>
          <Login />
        </> :
        <SiteProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path='/' element={<Castle />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/ders" element={<Ders />} />
          </Routes>

        </SiteProvider>}

    </>
  );
}

export default App;
