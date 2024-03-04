import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Cart, Heart, HeartFill } from "react-bootstrap-icons";
import StarRating from "./StarRating";
import Carousel from 'better-react-carousel' //$ npm install better-react-carousel --save

function ProductDetail(){
    const { productId } = useParams(); // Ottieni l'ID del prodotto dall'URL
    const [productDetail, setProductDetail] = useState(null);
    const [review, setReview] = useState([]);
    const navigate = useNavigate();
  
    // Funzione per recuperare i dettagli del prodotto
    const getProductDetail = (productId) => {
      fetch(`http://localhost:3010/product/${productId}`, {
        headers: { Authorization: localStorage.getItem("tokenAdmin") },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Errore nel recupero dei dettagli del prodotto");
          }
        })
        .then((data) => {
          console.log("Product:")
          console.log(data);
          setProductDetail(data); // Imposta i dettagli del prodotto nello stato
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getReviews = (productId)=>{
      fetch(`http://localhost:3010/review/filterproduct?productId=${productId}`,{
        headers: {Authorization: localStorage.getItem("tokenAdmin")},
      })
      .then((res)=>{
        if(res.ok){
          return res.json();
        }else{
          throw new Error("Errore nel recupero delle recensioni del prodotto");
        }
      })
      .then((data)=>{
        console.log("Review:")
        console.log(data);
        setReview(data);
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    const addProductToCart = (productId) => {
      fetch(`http://localhost:3010/cart/${productId}/addproduct`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("tokenAdmin")
        },
      })
      .then((res)=>{
        if(res.ok){
          return res.json()
        }else{
          throw new Error("Errore nell'aggiungere il prodotto nel carrello")
        }
      })
      .then((data)=>{
        console.log("Carrello: ")
          console.log(data)
          window.location.reload()
      })
      .catch((err)=>{
        console.log(err)
      })
    }


    const calculateAverageRating = () => {
      if (review.length === 0) {
        return ("Non ci sono ancora recensioni");
      }
      const totalRating = review.reduce((acc, curr) => acc + curr.rating, 0);
      const averageRating = totalRating / review.length;
      // Arrotonda la media delle recensioni a due decimali
      return averageRating.toFixed(2);
    };
    // Utilizza la funzione calculateAverageRating per ottenere la media delle recensioni
    const averageRating = calculateAverageRating();

    const ArrowLeft = ({ onClick }) => (
      <div className="d-flex justify-content-center align-items-center"
        style={{  
          // color:"#E38F38",
          position: 'absolute',
          top: '50%',
          left: '-10px',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
        }}
        onClick={onClick} src="/arrow-left-square.svg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
  <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1"/>
</svg>
      </div>
    );
    const ArrowRight = ({ onClick }) => (
      <div className="d-flex justify-content-center align-items-center"
        style={{  
          // color:"#E38F38",
          position: 'absolute',
          top: '50%',
          right: '-44px',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
        }}
        onClick={onClick} src="/arrow-left-square.svg"
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
  <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1"/>
</svg>
      </div>
    );

    const MyDot = ({ isActive }) => (
      <span
        style={{
          marginTop:"30px", 
          borderRadius:"100%",
          display: 'inline-block',
          height: isActive ? '22px' : '15px',
          width: isActive ? '22px' : '15px',
          background: "white",
          border: `3px solid ${isActive ? "black" : '#E38F38'}`
        }}
      ></span>
    )
  
    useEffect(() => {
      // Esegui la fetch dei dettagli del prodotto quando l'ID del prodotto cambia
      getProductDetail(productId);
      getReviews(productId);
    }, [productId]); // Assicurati di fare la richiesta ogni volta che cambia l'ID del prodotto
  
    return(
    <>
    <Container className="mt-5">
              <Row>
{/* ---------------------------------------------     LEFT PAGE -----------------------------------------------------------------------*/}
                <Col lg={7}>
                    {productDetail ? (
                  <Row>
                    <Col xs={1} className="d-block d-md-none">
                      {/* Margine solo in dimensione XS, margine nascosto in MD */}
                    </Col>
                  <Col xs={10}>
                <Carousel gap={10}  loop showDots={true} arrowLeft={<ArrowLeft />} arrowRight={<ArrowRight/>} dot={MyDot} mobileBreakpoint={200} autoplay={4000}>
                      <Carousel.Item >
                        <img width="100%" height="100%" src={productDetail.photo1} style={{objectFit:"cover", borderRadius:"20px"}}  />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img width="100%" height="100%" src={productDetail.photo2} style={{objectFit:"cover", borderRadius:"20px"}}/>
                      </Carousel.Item>
                      <Carousel.Item>
                        <img width="100%" height="100%" src={productDetail.photo3} style={{objectFit:"cover", borderRadius:"20px"}} />
                      </Carousel.Item>
                    </Carousel>
                  </Col>
                </Row>
                ) : (
                  <p>Loading...</p>
                )}

                </Col>
 {/* ----------------------------------------------   RIGHT PAGE   ------------------------------------------------------------------------------------- */}
                <Col lg={5}>
                {productDetail ? (
                          <>
                          <div><h3 className="text-capitalize mt-5 fw-bold">{productDetail.title}</h3></div>
                          <div><p className="text-capitalize mt-4">{productDetail.description}</p></div>
                          <div>
                                <p className="">
                                Tipo di prodotto:
                                    <span className=" ms-2">
                                      {(productDetail.productType === "PHYSICAL") ? "Prodotto Fisico" : 
                                        (productDetail.productType === "DIGITAL") ? "Prodotto Digitale" : ""}
                                     </span>
                              </p>
                          </div>
                          <div><span className="fw-bold fs-1 text-art">{productDetail.price} €</span></div>
                          <Row>
                                    <Col className="d-flex">
                                          <Button variant="dark" className=" py-2 my-2 d-block w-100">Acquista</Button>
                                  </Col>
                                  <Col className="d-flex">
                                          <Button className="a-b-o-h pb-2 d-block my-2 w-100" 
                                          onClick={()=>{
                                            addProductToCart(productDetail.productId);
                                          }}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"  viewBox="0 0 16 16">
                          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                                        </svg>
                                          </Button>
                                  </Col>
                          </Row>
                          </>
                      ) : (
                          <p>Loading...</p>
                        )}
                {productDetail ? (
                          <Row className="d-flex flex-column shodow-p-nh mt-5 p-3">
                                    <div>
                                    <h1 className="fs-5"><span className="border-art-light">Ti presentiamo il venditore:</span></h1> 
                                      </div>
                            <Col>
                                  <Row >
                                    <Col className="mt-4 d-flex flex-row align-items-center">
                                    <div >
                                      <img src={productDetail.shop.logoShop} alt={productDetail.shop.shopName} 
                                      className="rounded-pill"
                                      style={{width:"70px", height:"70px", objectFit:"cover"}}/>
                                    </div>
                                  <div className="ms-4 text-capitalize">  
                                  <p className="fw-bold m-0">{productDetail.shop.seller.name} {productDetail.shop.seller.surname}</p>
                                  <p className="m-0">{productDetail.shop.locality ? productDetail.shop.locality : "località"}</p>
                                  </div>
                                    </Col>
                                  </Row>
                            </Col>

                            <Col className="d-flex  m-0 p-0">
                                          <Row className="w-100 p-0 m-0">
                                            <Col className="d-flex align-items-center">
                                                    <div
                                                      onClick={() => {
                                                        navigate(`/shop/${productDetail.shop.shopId}`); // Reindirizza all'URL del dettaglio del prodotto con l'ID dinamico
                                                      }}
                                                      >Proprietario di <span style={{ cursor: 'pointer' }} className="orange-on-hover fw-bold">{productDetail.shop.shopName}</span>
                                                      </div>
                                                    </Col>
                                            <Col className="d-flex justify-content-end p-0">
                                                  <Button variant="outline-dark" className=" d-block my-2">
                                                      <Heart/> <span className="ms-2">Segui Negozio</span>
                                                      </Button>
                                            </Col>
                                          </Row>                                                            
                            </Col>
                          </Row>
                      ) : (
                          <p>Loading...</p>
                        )}
                </Col>
              </Row>

{/* ----------------------------------------------   REVIEW   ------------------------------------------------------------------------------------- */}
             <Row>
                    <Col className="mt-3 mb-4">
                        <h1 className="fs-4 mt-5 fw-bold "><span className="border-art">Recensioni del Prodotto</span></h1>
                     </Col>  
                </Row>
             
              <Row className="d-flex flex-row justify-content-center">
                        <Col xs={6} >
                        <div className="d-flex flex-row align-items-center mb-5 justify-content-center">
                            <p className="m-0 me-2">Media recensioni: </p>
                            <StarRating rating={averageRating}/>
                            <p className="m-0 ms-2">({review.length})</p>
                         </div>
                      {review && review.map((reviews)=>{
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
   
    </Container>
    </>
    )
}
export default ProductDetail