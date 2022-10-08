import './App.css';
import SiteProvider, { useSiteContext } from './context/SiteContext';
import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { Link, Route, Routes } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Account from './components/Account';
import { AuthContextProvider, UserAuth } from './context/AuthContext';


function App() {

  const {user, logout} = UserAuth();

  const StyledApp = styled.div`
  .hide-mobile{
    @media(max-width:992px){
      display:none !important;
    }
  }
  .hide-desktop{
    @media(min-width:992px){
      display:none !important;
    }
  }
  .container {
    padding-top:2%;
    @media(max-width:992px){
      padding-top:20% !important
    }
    @media(max-width:768px){
      padding-top:35% !important
    }
  }
  .cart-list {
    @media(max-width:992px){
      padding-left:0.5em !important;
      padding-right:0.5em !important;
    }
  }
`;
  return (
    <StyledApp className="h-100">
   {JSON.parse(localStorage.getItem("userIds")) ? <AuthContextProvider>
      <SiteProvider>
      <Toaster position="top-right" />

    <Row className="h-100"> 
        <Col xl="10" lg="9" sm="12" md="12" className="container px-0">
          <Routes>
            <Route index element={<Account />} /> 
            <Route path='/login' element={<Login />} /> 
            <Route path="/signup" element={<SignUp />} /> 
          </Routes>
        </Col>
      </Row> 

    </SiteProvider> 
    </AuthContextProvider>
    : <Login />} 
  </StyledApp>
  );
}

export default App;
