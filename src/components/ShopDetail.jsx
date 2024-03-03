import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Button, Col, Container, Dropdown, Form, InputGroup, Row } from "react-bootstrap";
import StarRating from "./StarRating";

function ShopDetail(){
    const {shopId} = useParams(); // Ottieni l'ID del prodotto dall'URL
    const [shopDetail, setShopDetail] = useState(null);
    const [shopProducts, setShopProducts] = useState([]);
    const [reviewShop, setReviewShop] = useState([]);
    const [selectedOption, setSelectedOption] = useState("Più recente"); // Imposta l'opzione predefinita
    const [selectedOptionReview, setSelectedOptionReview] = useState("Suggeriti");

    const navigate = useNavigate();
    
    const handleSelect = (eventKey) => {
        setSelectedOption(eventKey);
      };
    const handleSelectReview = (eventKey) => {
        setSelectedOptionReview(eventKey);
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
const getShopReview = (shopId)=>{
    fetch(`http://localhost:3010/review/filter?shopId=${shopId}`, {
        headers: {Authorization: localStorage.getItem("tokenAdmin")},
    }).then((res)=>{
        if(res.ok){
            return res.json()
        }else{
            throw new Error("Errore nel recupero recensioni del negozio")
        }
    })
    .then((data)=>{
        setReviewShop(data)
        console.log("Recensioni Negozio:")
        console.log(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}

const calculateAverageRating = () => {
    if (reviewShop.length === 0) {
      return ("Non ci sono ancora recensioni");
    }
    const totalRating = reviewShop.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRating / reviewShop.length;
    // Arrotonda la media delle recensioni a due decimali
    return averageRating.toFixed(2);
  };
  // Utilizza la funzione calculateAverageRating per ottenere la media delle recensioni
  const averageRating = calculateAverageRating();


    useEffect(()=>{
        getShop(shopId)
        getShopProducts(shopId)
        getShopReview(shopId)
    },[shopId])

    return(
        <>
        {shopDetail ? (
            <div className="mt-5" style={{width:"82%", margin:"0 auto"}}>
                <div style={{position:"relative"}}>
                  <img src={shopDetail.coverImageShop} alt={shopDetail.shopName} className="img-fluid w-100 rounded-3" style={{height:"300px", objectFit: 'cover'}}/>
                  <div style={{position:"absolute", left:"100px", bottom:"-40px"}}>
                    <div className="p-1 bg-white rounded-3">
                    <img src={shopDetail.logoShop} alt={shopDetail.shopName}  style={{width:"150px"}} className="rounded-3"/>
                    </div>
                  </div>
                </div>
                <Row className="mt-4">
                    <Col></Col>
                </Row>
                  <Row className="mt-5 border rounded-3 shodow-p-nh mx-1">           
                    <Col className="ms-5 ps-5 my-3 d-flex flex-column justify-content-center">
                    <p className="fs-2 fw-bold m-0 text-art">{shopDetail.shopName}</p>
                    <p className="fs-4 m-0">{shopDetail.description ? shopDetail.description : "Inserisci descrizione negozio"}</p>
                    
                    <p className="fs-5 mt-2">Totale Vendite: {shopDetail.numberOfSales}</p>
                    </Col>
                    
                    <Col className="me-5 pe-5 my-4 pt-2 border-2 border-start">
                        <Row className="d-flex align-items-center">
                            <Col className="d-flex flex-column align-items-end">
                            <img src={shopDetail.seller.avatar} alt={shopDetail.shopName} className="rounded-pill" style={{height:"90px", width: "90px", objectFit:"cover"}}/>
                            </Col>
                            <Col className="d-flex flex-column align-items-start">
                            <h3 className="text-capitalize">{shopDetail.seller.name} {shopDetail.seller.surname}</h3>
                            <p className="m-0 text-capitalize">{shopDetail.locality} ( {shopDetail.nation} )</p>
                            <p className="m-0 mt-1">Proprietario di {shopDetail.shopName}</p>
                            </Col>
                        </Row>
                    </Col>
                  </Row>
                  </div>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="icon-effect-heart" viewBox="0 0 24 24" width="20" height="20" fill="white" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
                </div>
              </div>
                        <div>{product.title}</div>
                        <div>€ {product.price}</div>
                    </Col>
                )
                })}
                </Row>
                <Row className="d-flex flex-column pt-4 mt-5 mb-4 border-top border-2">
                    <Row>
                    <Col className="d-flex align-items-center"><h5>Recensioni:</h5></Col>
                    <Col className="d-flex flex-row align-items-center">
                        <p className="m-0 me-2">Media recensioni: </p>
                        <StarRating rating={averageRating}/>
                        <p className="m-0 ms-2">({reviewShop.length})</p>
                    </Col>
                    <Col className="d-flex justify-content-end">
                    <Dropdown onSelect={handleSelectReview}>
                            <Dropdown.Toggle id="dropdown-basic" className=' icon-effect rounded-pill px-5 fs-5' >
                             Ordina: {selectedOptionReview}
                            </Dropdown.Toggle>
                                <Dropdown.Menu>
                                <Dropdown.Item eventKey="Suggeriti">Suggeriti</Dropdown.Item>
                                <Dropdown.Item eventKey="Più recenti">Più recenti</Dropdown.Item>
                                </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    </Row>
  {/* ------------------------------------------------------------    MAP delle recensioni      -------------------------------------------------------------------------*/}
                    <Row className="mt-3" >
                            <Col></Col>
                            <Col md={8}>
                                <Row className="d-flex flex-column">
                                {reviewShop && reviewShop.map((reviews)=>{
                                    return(
                                        <Row key={reviews.reviewId} className="mb-3 border-bottom">
                                    <Col xs={1}  className="m-0 p-0">
                                    <img src={reviews.buyerReview.avatar} alt="review" style={{                   
                                        width: "50px",   // Assicura che l'immagine occupi l'intero spazio del contenitore
                                        height: "50px",  // Assicura che l'immagine occupi l'intero spazio del contenitore
                                        objectFit: "cover", // Fai in modo che l'immagine copra l'intero spazio mantenendo le proporzioni
                                        aspectRatio: '1 / 1', // Imposta un rapporto d'aspetto 1:1
                                        overflow: 'hidden', // Nasconde le parti dell'immagine che eccedono il contenitore
                                        borderRadius: '50%', // Imposta i bordi arrotondati al massimo
                                        padding:"0"
                                    }}/>
                                    </Col>
                                    <Col className="mb-4">
                                        <p><span className="orange-on-hover">{reviews.buyerReview.name} {reviews.buyerReview.surname}</span> il {reviews.dateReview}</p>
                                        <StarRating rating={reviews.rating}/>
                                        <p className="mt-2 mb-0">{reviews.description}</p>
                                        <Button className='my-3 fs-6 icon-effect rounded-pill px-3 d-flex align-items-center'>
                                            Contatta acquirente
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-2" viewBox="0 0 16 16">
  <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                                            </svg>             
                                            </Button>
                                            <div className="d-flex align-items-center">
                                                <div><img src={reviews.photoReview} alt="reviews" style={{
                                                    width: "120px",   // Assicura che l'immagine occupi l'intero spazio del contenitore
                                                    height: "80px",  // Assicura che l'immagine occupi l'intero spazio del contenitore
                                                    objectFit: "cover", // Fai in modo che l'immagine copra l'intero spazio mantenendo le proporzioni
                                                    aspectRatio: '1 / 1', // Imposta un rapporto d'aspetto 1:1
                                                    overflow: 'hidden', // Nasconde le parti dell'immagine che eccedono il contenitore
                                                    borderRadius: '8px', 
                                                    padding:"0"
                                                }}/></div>
                                                <div><h6 className="ms-4">{reviews.productReview.title}</h6></div>
                                            </div>
                                    </Col>
                                    </Row>
                                            )
                                        })}
                                     </Row>                               
                            </Col>
                            <Col></Col>
                        </Row>
 {/* --------------------------------------------------------    fine MAP delle recensioni      ------------------------------------------------------------------------*/}
            </Row>
            </Container>
        </>
    )
}
export default ShopDetail