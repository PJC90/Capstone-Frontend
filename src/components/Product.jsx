import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Product(){
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    const getProduct = ()=>{
        fetch("http://localhost:3010/product",{
            headers:{Authorization: localStorage.getItem("tokenAdmin")}
        })
        .then((res)=>{
            if(res.ok){
                return res.json();
            }else{
                throw new Error("Errore nel login")
            }
        })
        .then((data)=>{
            console.log("Prodotti:")
            console.log(data.content);
            setProduct(data.content);
        })
        .catch((err)=>{
            console.log(err);

        })
    }
useEffect(()=>{
    getProduct();
},[])
    
    return(
        <Container className="mt-5">
        <h1 className="fs-4">Prodotti</h1>
        <Row xs={1} md={5} className="g-4">
          {product && product.map((product) => (
            <Col key={product.productId} className="hoover-card py-2 px-2">
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
                    objectFit: "cover" , // Fai in modo che l'immagine copra l'intero spazio mantenendo le proporzioni
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
                    borderRadius: "5px"
                  }}
                >
                  € {product.price}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      
    )
}
export default Product