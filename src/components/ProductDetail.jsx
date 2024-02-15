import { useParams } from "react-router-dom";
import CustomNavbar from "./CustomNavbar"
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

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
    <Container>
      <Row>
        {/* Prima colonna */}
        <Col sm={4}>
          {productDetail && (
            <>
              <img src={productDetail.photo1} alt={productDetail.title} />
              <img src={productDetail.photo2} alt={productDetail.title} />
              <img src={productDetail.photo3} alt={productDetail.title} />
            </>
          )}
        </Col>
        
        {/* Seconda colonna */}
        <Col sm={4}>
          {productDetail && (
            <>
              <img src={productDetail.photo1} alt={productDetail.title} />
              <img src={productDetail.photo2} alt={productDetail.title} />
              <img src={productDetail.photo3} alt={productDetail.title} />
            </>
          )}
        </Col>
        
        {/* Terza colonna */}
        <Col sm={4}>
          {productDetail && (
            <>
              <h2>{productDetail.title}</h2>
              <p>{productDetail.description}</p>
              <p>Prezzo: € {productDetail.price}</p>
              {/* Aggiungi altre informazioni del prodotto qui */}
            </>
          )}
        </Col>
      </Row>
    </Container>
    </>
    )
}
export default ProductDetail