import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Col, Row } from "react-bootstrap";
import StarRating from "./StarRating";

function ShopDetail(){
    const {shopId} = useParams(); // Ottieni l'ID del prodotto dall'URL
    const [shopDetail, setShopDetail] = useState(null);
    const [shopProducts, setShopProducts] = useState([]);
    const [reviewShop, setReviewShop] = useState([]);
    const [isHovered, setIsHovered] = useState(null)


    const navigate = useNavigate();
     


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
                <div  style={{width:"82%", margin:"0 auto"}}>

                    <Row>
                        <Col className="mt-3 mb-4">
                            <h1 className="fs-4 mt-5 fw-bold "><span className="border-art">Prodotti del Negozio</span></h1>
                        </Col>
                    </Row>
                  
                <Row xs={1} md={2} lg={3} xl={4} className="g-4 ">
             {shopProducts && shopProducts.map((product, index)=>{
                return(
                    <Col key={product.productId}  >
                        <div className="shodow-p p-3 rounded-3"   onClick={() => {navigate(`/product/${product.productId}`);}} style={{cursor: 'pointer'}}>
                        <div 
                style={{
                  position: "relative",
                  width: "100%",   
                  paddingBottom: "65%",  
                  overflow: "hidden",
                  borderRadius:"7px"
                }}
              >
                <img
                  src={product.photo1}
                  alt={product.title}
                  style={{
                    position: "absolute",
                    width: "100%",   
                    height: "100%",  
                    objectFit: "cover"  
                  }}
                  onMouseEnter={()=>{setIsHovered(index)}}
                  onMouseLeave={()=>{setIsHovered(null)}}
                />
                {isHovered === index && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "#E38F38",
                    padding: "5px",
                    borderRadius: "50%", 
                    width: "40px", 
                    height: "40px", 
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
             {/*  <FontAwesomeIcon icon={faHeart} size={20} color="black" />  Utilizza l'icona di cuore da FontAwesome */}
                 <svg xmlns="http://www.w3.org/2000/svg" className="icon-effect-heart" viewBox="0 0 24 24" width="20" height="20" fill="#E38F38" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                )}
              </div>
                        {/* Contenuto */}
                            <div>
                                <Row className="mt-3">
                                    <Col xs={8} className="ms-1">
                                        <p className="text-capitalize fs-5">{product.title}</p>
                                        <h3>{product.price} €</h3>
                                    </Col>
                                    <Col className="d-flex justify-content-end align-items-center">
                                    <div className="me-2 a-b-o d-flex justify-content-center align-items-center rounded-pill" style={{width:"50px", height:"50px"}}>
                                        <img src="/Cart-Stramb.svg" alt="cart-icon"/>
                                    </div>
                                    </Col>
                                </Row>
                            </div>
             </div>            
                    </Col>
                )
                })}
                </Row>
  {/* ------------------------------------------------------------    MAP delle recensioni      -------------------------------------------------------------------------*/}
                <Row>
                    <Col className="mt-3 mb-4">
                        <h1 className="fs-4 mt-5 fw-bold "><span className="border-art">Recensioni del Negozio</span></h1>
                     </Col>  
                </Row>
                
                       
                    <Row className="d-flex flex-row justify-content-center">
                        <Col xs={5} >
                        <div className="d-flex flex-row align-items-center mb-5 justify-content-center">
                            <p className="m-0 me-2">Media recensioni: </p>
                            <StarRating rating={averageRating}/>
                            <p className="m-0 ms-2">({reviewShop.length})</p>
                         </div>
                                {reviewShop && reviewShop.map((reviews)=>{
                                    return(                                                           
                                        <Row key={reviews.reviewId} className="mb-3 shodow-p-nh rounded-3 p-4 ">
                                            <Col className="d-flex">
                                                <Row className="d-flex flex-column">
                                                    <Col className="d-flex align-items-center ">
                                                        <img src={reviews.buyerReview.avatar} alt="review" style={{                   
                                                            width: "70px",   // Assicura che l'immagine occupi l'intero spazio del contenitore
                                                            height: "70px",  // Assicura che l'immagine occupi l'intero spazio del contenitore
                                                            objectFit: "cover", // Fai in modo che l'immagine copra l'intero spazio mantenendo le proporzioni
                                                            aspectRatio: '1 / 1', // Imposta un rapporto d'aspetto 1:1
                                                            overflow: 'hidden', // Nasconde le parti dell'immagine che eccedono il contenitore
                                                            borderRadius: '50%', // Imposta i bordi arrotondati al massimo
                                                            padding:"0"
                                                        }}/>
                                                            <p className="m-0 ms-3 fw-bold text-capitalize fs-5">{reviews.buyerReview.name} {reviews.buyerReview.surname}</p>
                                                    </Col>
                                                    <Col>
                                                     <StarRating rating={reviews.rating} />
                                                    <p className="mt-2 mb-0">{reviews.description}</p>
                                                    <p className="mt-2 mb-0">{reviews.dateReview}</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col className="d-flex align-items-center justify-content-end p-0">
                                           
                                                <img src={reviews.photoReview} alt="reviews" style={{
                                                    width: "200px",   // Assicura che l'immagine occupi l'intero spazio del contenitore
                                                    height: "200px",  // Assicura che l'immagine occupi l'intero spazio del contenitore
                                                    objectFit: "cover", // Fai in modo che l'immagine copra l'intero spazio mantenendo le proporzioni
                                                    aspectRatio: '1 / 1', // Imposta un rapporto d'aspetto 1:1
                                                    overflow: 'hidden', // Nasconde le parti dell'immagine che eccedono il contenitore
                                                    borderRadius: '8px', 
                                                    padding:"0"
                                                }}/>
                                            
                                            </Col>
                                        </Row>                                    
                                            )
                                        })}
                                              
                                        </Col>
                                    </Row>
     {/*   ------------------------------    fine MAP delle recensioni      ------------------------------------------------------------------------*/}
           
            <Row>
                    <Col className="mt-3 mb-4">
                        <h1 className="fs-4 mt-5 fw-bold "><span className="border-art">Informazioni del Negozio</span></h1>
                     </Col>  
                </Row>
           
                {shopDetail ? (
                    <>
                     <Row className="d-flex flex-row justify-content-center align-items-start">
                        <Col xs={6}>
                        <p className="fw-bold">Informazioni su {shopDetail.shopName}:</p>
                        <p>
                            Benvenuti nel nostro negozio di artigianato, un luogo dove la creatività e l'abilità artigianale si fondono per offrire pezzi unici e distintivi. 
                            Siamo orgogliosi di presentare una vasta selezione di creazioni artigianali, realizzate con passione e cura dai nostri artigiani locali. 
                            Dalle opere d'arte alle creazioni in ceramica, gioielli fatti a mano, tessuti artigianali e molto altro ancora, ogni articolo nel nostro negozio 
                            porta con sé il carattere e l'individualità che solo l'artigianato può offrire. Ogni pezzo è frutto di ore di lavoro artigianale, con un'attenzione scrupolosa 
                            ai dettagli e un rispetto per le tradizioni artigianali. Sia che tu stia cercando un regalo unico o desideri arricchire la tua casa con opere d'arte originali, 
                            siamo qui per soddisfare le tue esigenze con la nostra collezione eclettica e autentica. 
                            Esplora il nostro negozio e lasciati ispirare dalla bellezza dell'artigianato fatto a mano.
                        </p>
                        </Col> 
                    </Row>
                     <Row className="mt-5 d-flex flex-row justify-content-center align-items-start">
                        <Col xs={6}>
                        <p className="fw-bold">Download digitali</p>
                        <p>
                        Download istantanei, i tuoi file saranno disponibili per il download una volta confermato il pagamento
                        </p>
                        </Col> 
                    </Row>
                     <Row className="mt-5 d-flex flex-row justify-content-center align-items-start">
                        <Col xs={6}>
                        <p className="fw-bold">Informazioni sulla spedizione</p>
                        <p>
                        Le mie creazioni sono spedite in tutto il mondo.
                        Per conoscere il costo di spedizione di un dato paese dai un'occhiata alle informazioni che trovi in ciascuna inserzione.
                        Farò sempre del mio meglio perché il tuo ordine arrivi in tempo, ma ti prego di considerare che eventuali ritardi imprevisti sono fuori dal mio controllo e dipendono dal servizio postale.
                        </p>
                        </Col> 
                    </Row>
                     <Row className="mt-5 d-flex flex-row justify-content-center align-items-start">
                        <Col xs={6}>
                        <p className="fw-bold">Cambi e restituzioni</p>
                        <p>
                        Nel caso tu non sia soddisfatto del tuo acquisto, puoi effettuarne il reso entro 14 giorni dalla ricezione del pacco.
                        Il prodotto deve essere restituito in perfette condizioni, con eventuali etichette e nella scatola originale. Una volta ricevuto il tuo reso e verificatene le condizioni, sarai rimborsato per l'intero costo iniziale eccetto le spese di spedizione.
                        Il rimborso ti sarà restituito sullo stesso metodo di pagamento che hai utilizzato per l'acquisto.
                        Nel caso tu voglia effettuare un cambio con un'altra delle mie creazioni (o con un ordine personalizzato), potrai rendere il prodotto acquistato seguendo la procedura di reso ed effettuare un altro ordine.
                        I costi di spedizione per resi e cambi sono a carico del cliente.
                        </p>
                        </Col> 
                    </Row>
                    </>
                ) : (
                <p>Loading...</p>
                    )}
            
            </div>
        </>
    )
}
export default ShopDetail