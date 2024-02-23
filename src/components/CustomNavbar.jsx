import { useEffect, useRef, useState } from 'react';
import { Button, Col, Dropdown, Form, InputGroup, Row} from 'react-bootstrap';
import { List, Person, Search } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

function CustomNavbar() {
  const [modalShow, setModalShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [productCart, setProductCart] = useState([]);

  const navigate = useNavigate();

  const getProductInMyCart = () =>{
    fetch("http://localhost:3010/cart/productInCart",{
      headers:{Authorization:localStorage.getItem("tokenAdmin")},
    })
    .then((res)=>{
      if(res.ok){
        return res.json()
      }else{
        throw new Error("Errore nel recupero del tuo carrello")
      }
    })
    .then((data)=>{
        setProductCart(data)
        console.log("Prodotti nel mio carrello:")
        console.log(data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
 
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
        setIsLoggedIn(true);
        getProductInMyCart();
      }
    //  viene eseguito solo al montaggio iniziale(componentDidMount) 
    //  legge lo storage per vedere se sei loggato cosi compare l'icona di quanto sei loggato
  }, []);


  const handleLoginSuccess = () => {
    localStorage.setItem("isLoggedIn", "true");
    setModalShow(false); // Chiudi il modale solo se l'autenticazione ha avuto successo
    setIsLoggedIn(true); // Imposta lo stato di accesso su true dopo il login
    window.location.reload();

  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false); // Imposta lo stato di accesso su false dopo il logout
    localStorage.removeItem("tokenAdmin");
    navigate("/")
    window.location.reload();
  };

  return (
    <>
    <Navbar expand="lg" className="border-2 border-bottom" >
      <Container className='mt-2 mb-2'>
      <Row className='w-100 d-flex flex-nowrap align-items-center'>
{/*--------------------------------------------- LOGO ARTESUM ----------------------------------------------------*/}
        <Col>
             <Navbar.Brand href="/" onClick={()=>{navigate('/')}}>
              <img src='/artesum-orange.png' alt="logo-artesum" width="130"/>
              </Navbar.Brand>
       </Col>
{/*------------------------------------------------ CATEGORIE ----------------------------------------------------*/}
       <Col >
            <Nav >
              <Dropdown >
                <Dropdown.Toggle id="dropdown-basic" className='custom-dropdown-toggle icon-effect rounded-pill' >
                <List className='me-2'/> Categorie
                </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
              </Dropdown>
            </Nav>
        </Col>
{/*------------------------------------------------ INPUT ----------------------------------------------------*/}
        <Col xs={7}>
          <InputGroup size="md" className="custom-input-group rounded-pill bg-white ">
            <Form.Control
                  placeholder='Cerca tutto quello che vuoi'
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  className="m-1 rounded-pill border border-0"
                />
            <InputGroup.Text id="inputGroup-sizing-lg" className="custom-input-group-text rounded-pill" style={{ cursor: 'pointer' }}><Search/></InputGroup.Text>
            </InputGroup>
            </Col>
{/*------------------------------------------------ ACCEDI ----------------------------------------------------*/}
    <Col >
            {isLoggedIn ?(
              // Se l'utente è loggato, mostra l'icona "Person" per il logout
            <Dropdown >
            <Dropdown.Toggle id="dropdown-basic" className='custom-dropdown-toggle icon-effect rounded-pill' >
            <Person style={{width:'30px', height:'30px'}}/>
            </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item >Action</Dropdown.Item>
                  <Dropdown.Item onClick={()=>{navigate("/updateuser")}}>Gestione Profilo</Dropdown.Item>
                  <Dropdown.Item onClick={()=>{navigate("/updateshop")}}>Gestione Negozio</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                </Dropdown.Menu>
          </Dropdown>
            ):(
            // Se l'utente non è loggato, mostra il pulsante "Accedi" per il login
              <Button className='icon-effect rounded-pill' onClick={()=> setModalShow(true)}>
                    Accedi
                  </Button>
            )}
   <Login show={modalShow} onHide={()=> setModalShow(false)} onLoginSuccess={handleLoginSuccess} />
    </Col>
{/*---------------------------------------------- LOGO HEART ----------------------------------------------------*/}
  <Col >
               <div className='icon-effect'
                  style={{
                    backgroundColor: "rgba(255, 255, 255)",
                    padding: "5px",
                    borderRadius: "50%", // Imposta il bordo a metà della larghezza e altezza
                    width: "50px", // Imposta la larghezza del cerchio
                    height: "50px", // Imposta l'altezza del cerchio
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center", 
                    cursor:"pointer"
                  }}
                >
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
  <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
</svg>
         </div>
  </Col>
{/*--------------------------------------------- LOGO CARRELLO ----------------------------------------------------*/}
  <Col >
      <div className='icon-effect'
                      style={{
                        backgroundColor: "rgba(255, 255, 255)",
                        padding: "5px",
                        borderRadius: "50%", // Imposta il bordo a metà della larghezza e altezza
                        width: "50px", // Imposta la larghezza del cerchio
                        height: "50px", // Imposta l'altezza del cerchio
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor:"pointer",
                        position:"relative"
                      }}
                      onClick={()=>{navigate("/cart");}}
                    >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"  viewBox="0 0 16 16">
      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
          </svg>
          <div style={{position:"absolute", bottom:"-3px", right:"-3px", width:"20px", height:"20px"}} 
          className='bg-danger rounded-pill text-white d-flex justify-content-center align-items-center '>
            {productCart && productCart.length}</div>
    </div>

  </Col>

</Row>
     </Container>
    </Navbar>
    {/* <Container>
    <Row className='d-flex flex-nowrap'>
    <Col className='bg-success'>hola</Col>
    <Col className='bg-dark'>hola</Col>
    <Col className='bg-info' xs={7}>hola</Col>
    <Col className='bg-dark' xs={2}>hola</Col>
    <Col className='bg-success' xs={1}>hola</Col>
    <Col className='bg-dark' xs={1}>hola</Col>
  </Row>
  </Container> */}
  </>
  );
}

export default CustomNavbar;