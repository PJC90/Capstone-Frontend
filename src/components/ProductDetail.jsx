import { useParams } from "react-router-dom";
import CustomNavbar from "./CustomNavbar"
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

function ProductDetail(){
    const { productId } = useParams(); // Ottieni l'ID del prodotto dall'URL
    const [productDetail, setProductDetail] = useState(null);
  
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
          console.log(data);
          setProductDetail(data); // Imposta i dettagli del prodotto nello stato
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    useEffect(() => {
      // Esegui la fetch dei dettagli del prodotto quando l'ID del prodotto cambia
      getProductDetail(productId);
    }, [productId]); // Assicurati di fare la richiesta ogni volta che cambia l'ID del prodotto
  
    return(
    <>
    <CustomNavbar/>
    <Container className="w-100">
        <Row>
            <Col >
            {productDetail ? (
                 <CarouselProvider
                 naturalSlideWidth={25}
                 naturalSlideHeight={50}
                 totalSlides={3}
               >
                 <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
                 <Slider>
                   <Slide index={0}><img src={productDetail.photo1} alt={productDetail.title} style={{ width: "100%", height: "50%", display: "block" }}/></Slide>
                   <Slide index={1}><img src={productDetail.photo2} alt={productDetail.title} style={{ width: "100%", height: "50%", display: "block" }}/> </Slide>
                   <Slide index={2}><img src={productDetail.photo3} alt={productDetail.title} style={{ width: "100%", height: "50%", display: "block" }}/></Slide>
                 </Slider>
                
               </CarouselProvider>  
            ) : (
                <p>Loading...</p>
              )}
            </Col>
            <Col>
            {productDetail ? (
                <>
                 <div>{productDetail.title}</div>
                 <div>{productDetail.description}</div>
                 <div>{productDetail.productType}</div>
                 <div>{productDetail.price}</div>
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