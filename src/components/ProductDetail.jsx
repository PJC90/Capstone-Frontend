import { useNavigate, useParams } from "react-router-dom";
import CustomNavbar from "./CustomNavbar"
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import 'pure-react-carousel/dist/react-carousel.es.css';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Heart, HeartFill } from "react-bootstrap-icons";
import StarRating from "./StarRating";

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
                <Col lg={8}>
                    {productDetail ? (
                  <AwesomeSlider>
                  <div data-src={productDetail.photo1}/>
                  <div data-src={productDetail.photo2} />
                  <div data-src={productDetail.photo3} />
                </AwesomeSlider>
                ) : (
                  <p>Loading...</p>
                )}

                  <h1 className="fs-4 mt-5">{review.length} Recensioni del prodotto:</h1>
                      {review && review.map((reviewItem, i)=>{
                        return(
                          <Col className="mt-3" key={i}>
                            <Row>
                              <Col sm={2}>
                              <div>
                              <img src={reviewItem.photoReview} className="img-fluid"/>
                              </div>
                              </Col>
                              <Col>
                            <Row>
                              <Col sm={1} className="d-flex justify-content-center p-0">
                              <img src={reviewItem.buyerReview.avatar} className="img-fluid rounded-circle m-0" style={{ width: '50px', height: '50px' }}/>
                              </Col>
                              <Col className="p-0 d-flex flex-column align-items-center">
                              <p>{reviewItem.buyerReview.name} {reviewItem.buyerReview.surname}</p>
                              <p>data acquisto: {reviewItem.dateReview}</p>
                              </Col>
                            </Row>
                            <StarRating rating={reviewItem.rating}/>
                            <p>{reviewItem.description}</p>
                      </Col>
                    </Row>               
                </Col>
                )
              })}

                </Col>
 {/* ----------------------------------------------   RIGHT PAGE   ------------------------------------------------------------------------------------- */}
                <Col>
                {productDetail ? (
                          <>
                          <div>{productDetail.title}</div>
                          <div>{productDetail.description}</div>
                          <div>Tipo di prodotto: {productDetail.productType}</div>
                          <div>{productDetail.price}</div>
                          <Button className="bg-dark py-2 rounded-pill my-2 d-block w-100">Acquista</Button>
                          <Button className="bg-white text-dark border-black border-2 py-2 rounded-pill d-block my-2 w-100">Aggiungi al carrello</Button>
                          <Button className="py-2 rounded-pill icon-effect my-2 w-100"><HeartFill/>  Aggiungi ai preferiti</Button>
                          </>
                      ) : (
                          <p>Loading...</p>
                        )}
                {productDetail ? (
                          <>
                          <Row className="mt-4">
                            <Col xs={2}>
                            <div><img src={productDetail.shop.logoShop} alt={productDetail.shop.shopName}/></div>
                            </Col>
                            <Col>
                            <div>Ti presentiamo il venditore: </div>
                          <div>  {productDetail.shop.seller.name} {productDetail.shop.seller.surname}</div>
                          <div
                          onClick={() => {
                            navigate(`/shop/${productDetail.shop.shopId}`); // Reindirizza all'URL del dettaglio del prodotto con l'ID dinamico
                          }}
                          >Proprietario di <span style={{ cursor: 'pointer' }} className="orange-on-hover">{productDetail.shop.shopName}</span></div>
                            </Col>
                          </Row>
                          <Button className="py-2 rounded-pill icon-effect my-2 "><Heart/> Segui Negozio</Button>
                          <Button className="bg-white text-dark border-black border-2 py-2 rounded-pill d-block my-2 w-100">
                            Invia un messaggio a {productDetail.shop.seller.name} {productDetail.shop.seller.surname}
                          </Button>
                          </>
                      ) : (
                          <p>Loading...</p>
                        )}
                </Col>
              </Row>
   
    </Container>
    </>
    )
}
export default ProductDetail