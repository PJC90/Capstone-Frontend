import { useState } from 'react';
import { Button, Dropdown, Form, InputGroup} from 'react-bootstrap';
import {  Cart2, Heart, List, Search } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from './Login';

function CustomNavbar() {
  const [modalShow, setModalShow] = useState(false);

  const handleLoginSuccess = () => {
    setModalShow(false); // Chiudi il modale solo se l'autenticazione ha avuto successo
  };

  return (
    <Navbar expand="lg" className="border-2 border-bottom" >
      <Container className='mt-2 mb-2'>
        
       <Navbar.Brand href="#home">artesum</Navbar.Brand>
        
        <Nav>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className=' icon-effect rounded-pill me-4' >
            <List className='me-2'/> Categorie
            </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
          </Dropdown>
        </Nav>

  <InputGroup size="md" className="custom-input-group rounded-pill bg-white ">
     <Form.Control
          placeholder='Cerca tutto quello che vuoi'
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          className="m-1 rounded-pill border border-0"
        />
     <InputGroup.Text id="inputGroup-sizing-lg" className="custom-input-group-text rounded-pill"><Search/></InputGroup.Text>
    </InputGroup>

    <Button className='ms-5 me-3 icon-effect rounded-pill' onClick={()=> setModalShow(true)}>
      Accedi
    </Button>
    <Login show={modalShow} onHide={()=> setModalShow(false)} onLoginSuccess={handleLoginSuccess}/>

 
     <Heart className='icon-effect fs-2'/>
 
  
     <Cart2 className='icon-effect fs-1 ms-4'/> 
  
     </Container>
    </Navbar>
  );
}

export default CustomNavbar;