import { useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, InputGroup, Row} from 'react-bootstrap';
import { Archive, BoxArrowLeft, ChatLeft, Gear, GearWideConnected, Person, Search, Star } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getProductInCartAction } from '../redux/actions'

function CustomNavbar() {
  const [modalShow, setModalShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState(``)
  const [productBySearch, setProductBySearch] = useState([])
  const [myProfile, setMyProfile] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const dispatch = useDispatch()
  const productCart = useSelector((state) => state.cart.content)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdownLogin = () => {
    setIsOpenLogin(!isOpenLogin);
  };

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    try {
      navigate(path);
    } catch (error) {
      console.error('Si è verificato un errore durante la navigazione:', error);
    }
  };

  const getUser = () => {
    fetch("http://localhost:3010/users/me",{
      headers:{Authorization:localStorage.getItem("tokenAdmin")},
    })
    .then((res)=>{
      if(res.ok){
        return res.json()
      }else{
        throw new Error("Errore nel recupero del tuo profilo")
      }
    })
    .then((data)=>{
      setMyProfile(data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  const getCategories = () =>{
    fetch("http://localhost:3010/category?page=0&size=100&order=nameCategory",{
      headers:{Authorization:localStorage.getItem("tokenAdmin")}
    })
    .then((res)=>{
      if(res.ok){
        return res.json()
      }else{
        throw new Error("Errore nel ricevere categorie")
      }
    })
    .then((data)=>{
      setCategories(data.content)
      console.log("Categorie")
      console.log(data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const getProductStartWith = () => {
    fetch(`http://localhost:3010/product/startWith?title=${search}`,{
      headers:{Authorization:localStorage.getItem("tokenAdmin")}
    })
    .then((res)=>{
      if(res.ok){
        return res.json()
      }else{
        throw new Error("Errore nel ricevere prodotto in base al titolo")
      }
    })
    .then((data)=>{
      setProductBySearch(data)
      console.log("Prodotti By Title:")
      console.log(data)
      
    })
    .catch((err)=>{
      console.log(err)
    })
  }
 
  useEffect(() => {
    if (productBySearch.length > 0) {
      navigate('/searchwith', { state: { searchValue: productBySearch } });
      console.log("productBySearch:")
      console.log(productBySearch)
    }
  }, [productBySearch]);


  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
        setIsLoggedIn(true);
        dispatch(getProductInCartAction())
        getUser();
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
    <Navbar expand="lg" className="fixed-top sticky-top bg-white" style={{ boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.1), 0px 4px 8px 0px rgba(0,0,0,0.01)" }}>
      <Container fluid className='mt-2 mb-2'>
      <Row className='w-100 d-flex flex-nowrap align-items-center'>
       <Col xs={3}>
       <Row>
{/*--------------------------------------------- LOGO ARTESUM ----------------------------------------------------*/}
        <Col className='ms-5'>
             <Navbar.Brand href="/" onClick={()=>{handleNavigation('/')}}>
              <img src='/artesum-orange.png' alt="logo-artesum" width="130" className='logo-effect'/>
              </Navbar.Brand>
       </Col>
{/*------------------------------------------------ CATEGORIE ----------------------------------------------------*/}
       <Col >
            <Nav >
              <Dropdown onClick={()=>{getCategories()}} show={isOpen} onToggle={toggleDropdown}>
                <Dropdown.Toggle id="dropdown-basic" className='custom-dropdown-toggle icon-effect rounded-pill text-dark d-flex align-items-center' >
                <img src='/categories.svg' alt="logo-category" width="15" className='me-2'/> Categorie 
                </Dropdown.Toggle>
                    <Dropdown.Menu>{categories && categories.map((category, i)=>{
                      return(
                        <Dropdown.Item key={i} onClick={()=>{navigate(`/category/${category.categoryId}`)}}>{category.nameCategory}</Dropdown.Item>
                      )
                    })}
                    </Dropdown.Menu>
              </Dropdown>
            {/* Gestisce l'oscuramento della pagina sotto il dropdown */}
            {isOpen && <div className="overlay" onClick={toggleDropdown}></div>}
            </Nav>
        </Col>
                
       </Row>
       </Col> 
{/*------------------------------------------------ INPUT ----------------------------------------------------*/}

        <Col >
         <InputGroup >
            <Form.Control className="bg-body-tertiary "
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              placeholder='    |    Cerca qui'
                value={search}
                onChange={(e)=>{setSearch(e.target.value)}}
            />
                <Button onClick={()=>{
                  getProductStartWith();
                 
                  }} className='bg-body-tertiary border border-start-0 pe-2 py-1'>
                <Search className='fs-1 p-2 rounded-2 fw-bold search-custom' style={{width:"50px"}}/>
                </Button>
      </InputGroup>
        </Col>
{/* ------------------------------Col che racchiude le icone di destra -----------------------------------------*/}

<Col xs={2} className='ms-5'>
<Row className='d-flex align-items-center'>
  {/*---------------------------------------------- LOGO HEART ----------------------------------------------------*/}
  <Col className='d-flex justify-content-center align-items-center'>
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
  <Col className='d-flex justify-content-center align-items-center'>
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
          {productCart && (productCart.length > 0) ? (
          <div style={{position:"absolute", bottom:"-3px", right:"-3px", width:"20px", height:"20px", fontSize:"0.8em", backgroundColor:"#E38F38"}} 
          className=' rounded-pill text-white d-flex justify-content-center align-items-center '>
            {productCart && productCart.length}</div>
          ) : ("")}
    </div>
{/*------------------------------------------------ Notifiche ----------------------------------------------------*/}
  </Col>
  <Col className='d-flex justify-content-center align-items-center h-100'>
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
        <img src="/bell.svg" alt="icom-notification" width={27} height={27}/>
        </div>
  </Col>
{/*------------------------------------------------ ACCEDI ----------------------------------------------------*/}
    <Col className='d-flex justify-content-center align-items-center' >
            {isLoggedIn ?(
              // Se l'utente è loggato, mostra l'icona "Person" per il logout
            <Dropdown show={isOpenLogin} onToggle={toggleDropdownLogin}>
            <Dropdown.Toggle id="dropdown-basic" className='custom-dropdown-toggle icon-effect rounded-pill' style={{width:'50px', height:'50px',padding: "5px"}}>
            {myProfile && <img src={myProfile.avatar} alt={myProfile.name} style={{width:'40px', height:'40px', objectFit:"cover"}} className='rounded-pill'/>}
            </Dropdown.Toggle >
                <Dropdown.Menu className="dropdown-menu-end"> 
                  <Dropdown.Item ><Archive className='me-2'/>Aquisti</Dropdown.Item>
                  <Dropdown.Item ><Star className='me-2'/>Recensioni</Dropdown.Item>
                  <Dropdown.Item ><ChatLeft className='me-2'/>Messaggi</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={()=>{navigate("/updateuser")}}><Gear className='me-2'/>Gestione Profilo</Dropdown.Item>
                  <Dropdown.Item onClick={()=>{navigate("/updateshop")}}><GearWideConnected className='me-2'/>Gestione Negozio</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}><BoxArrowLeft className='me-2'/>Log out</Dropdown.Item>
                </Dropdown.Menu>
          </Dropdown>
            ):(
            // Se l'utente non è loggato, mostra il pulsante "Accedi" per il login
              <Button className='icon-effect rounded-pill' onClick={()=> setModalShow(true)}>
                    <Person style={{width:'30px', height:'30px'}}/>
                  </Button>
            )}
          {isOpenLogin && <div className="overlay" onClick={toggleDropdownLogin}></div>}
            
   <Login show={modalShow} onHide={()=> setModalShow(false)} onLoginSuccess={handleLoginSuccess} />
    </Col>


  </Row>
</Col>
</Row>
     </Container>
    </Navbar>
  </>
  );
}

export default CustomNavbar;