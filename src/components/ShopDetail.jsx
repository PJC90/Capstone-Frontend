import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import CustomNavbar from "./CustomNavbar";
import { Col, Container, Dropdown, Form, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { List } from "react-bootstrap-icons";
{/*  <FontAwesomeIcon icon={faHeart} size={20} color="black" />  Utilizza l'icona di cuore da FontAwesome */}

function ShopDetail(){
    const {shopId} = useParams(); // Ottieni l'ID del prodotto dall'URL
    const [shopDetail, setShopDetail] = useState(null);
    const [shopProducts, setShopProducts] = useState([]);
    const [selectedOption, setSelectedOption] = useState("Più recente"); // Imposta l'opzione predefinita

    const navigate = useNavigate();
    
    const handleSelect = (eventKey) => {
        setSelectedOption(eventKey);
      };


    const getShop = (shopId)=>{
        fetch(`http://localhost:3010/shop/${shopId}`,{
            headers: {Authorization: localStorage.getItem("tokenAdmin")},
        }).then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error("Errore nel recupero del negozio")
            }
        })
        .then((data)=>{
            setShopDetail(data)
            console.log("Singolo Shop:")
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const getShopProducts = (shopId)=>{
        fetch(`http://localhost:3010/shop/${shopId}/products`,{
            headers: {Authorization: localStorage.getItem("tokenAdmin")},
        }).then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error("Errore nel recupero del negozio")
            }
        })
        .then((data)=>{
            setShopProducts(data)
            console.log("Prodotti:")
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        getShop(shopId)
        getShopProducts(shopId)
    },[shopId])
    return(
        <>
        <CustomNavbar/>
        {shopDetail ? (
            <Container>
                  <img src={shopDetail.coverImageShop} alt={shopDetail.shopName} className="img-fluid w-100" style={{height:"300px", objectFit: 'cover'}}/>
                  <Row className="mt-5">
                    <Col xs={2}>
                    <img src={shopDetail.logoShop} alt={shopDetail.shopName} className="img-fluid w-100"/>
                    </Col>
                    <Col>
                    <h1>{shopDetail.shopName}</h1>
                    <h3>Descrizione negozio</h3>
                    <h4>{shopDetail.numberOfSales} Vendite</h4>
                    <h4>Media recensioni</h4>
                    </Col>
                    <Col></Col>
                    <Col xs={2} className="">
                        <Row className="d-flex flex-column ">
                            <Col className="d-flex flex-column align-items-center">
                            <img src={shopDetail.seller.avatar} alt={shopDetail.shopName} className="rounded-pill" style={{height:"90px", width: "90px"}}/>
                            </Col>
                            <Col className="d-flex flex-column align-items-center">
                            <p className="m-0 mt-3">Proprietario Negozio:</p>
                            <h3>{shopDetail.seller.name} {shopDetail.seller.surname}</h3>
                            </Col>
                        </Row>
                    </Col>
                  </Row>
                  </Container>
                ) : (
                  <p>Loading...</p>
                )}
                <Container className="mt-4">
                    <Row className="d-flex align-items-center my-4">
                        <Col><div><h6>Articoli</h6></div></Col>
                        <Col><div><h6>Recensioni</h6></div></Col>
                        <Col><div><h6>Informazioni</h6></div></Col>
                        <Col><div><h6>Condizioni di vendita</h6></div></Col>
                        <Col md={4}>
                        <InputGroup className="mb-3" style={{ borderRadius: '20px' }}>
                            <Form.Control
                                placeholder="Cerca tutto quello che vuoi"
                                aria-label="Cerca"
                                aria-describedby="basic-addon1"
                                style={{ borderRadius: '20px', borderRight: 'none' }}
                            />   
                        </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col><h3>Articoli</h3></Col>
                        <Col className="d-flex justify-content-end">
                        <Dropdown onSelect={handleSelect}>
                            <Dropdown.Toggle id="dropdown-basic" className=' icon-effect rounded-pill px-5 fs-5' >
                             Ordina: {selectedOption}
                            </Dropdown.Toggle>
                                <Dropdown.Menu>
                                <Dropdown.Item eventKey="Più recente">Più recente</Dropdown.Item>
                                <Dropdown.Item eventKey="Prezzo più basso">Prezzo più basso</Dropdown.Item>
                                <Dropdown.Item eventKey="Prezzo più alto">Prezzo più alto</Dropdown.Item>
                                </Dropdown.Menu>
                        </Dropdown>
                        </Col>
                    </Row>
                <Row xs={1} md={5}>
             {shopProducts && shopProducts.map((product)=>{
                return(
                    <Col key={product.productId} className="hoover-card pt-3" >
                        <div
                style={{
                  position: "relative",
                  width: "100%",   // Imposta la larghezza del contenitore all'immagine
                  paddingBottom: "100%",  // Imposta l'altezza del contenitore come rapporto 1:1 rispetto alla larghezza
                  overflow: "hidden"  // Assicura che l'immagine non vada al di fuori del contenitore
                }}
              >
                <img
                  src={product.photo1}
                  alt={product.title}
                  style={{
                    position: "absolute",
                    width: "100%",   // Assicura che l'immagine occupi l'intero spazio del contenitore
                    height: "100%",  // Assicura che l'immagine occupi l'intero spazio del contenitore
                    objectFit: "cover",  // Fai in modo che l'immagine copra l'intero spazio mantenendo le proporzioni
                    cursor: 'pointer' 
                  }}
                  onClick={() => {
                    navigate(`/product/${product.productId}`); // Reindirizza all'URL del dettaglio del prodotto con l'ID dinamico
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    backgroundColor: "rgba(255, 255, 255)",
                    padding: "5px",
                    borderRadius: "50%", // Imposta il bordo a metà della larghezza e altezza
                    width: "40px", // Imposta la larghezza del cerchio
                    height: "40px", // Imposta l'altezza del cerchio
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
             {/*  <FontAwesomeIcon icon={faHeart} size={20} color="black" />  Utilizza l'icona di cuore da FontAwesome */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="white" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
                </div>
              </div>
                        <div>{product.title}</div>
                        <div>€ {product.price}</div>
                    </Col>
                )
                })}
                </Row>
                
                </Container>
        </>
    )
}
export default ShopDetail