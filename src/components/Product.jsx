import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap";
import { Cart, Heart } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function Product(){
    const [product, setProduct] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(8);
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

    const showMoreProducts = () => {
      setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 8);
  };

useEffect(()=>{
    getProduct();
},[])
    
    return(
        <div style={{width:"82%", margin:"0 auto"}}>
          <Row>
            <Col className="mt-5"></Col>
          </Row>
          <Row>
            <Col className="mt-5"></Col>
          </Row>
          <Row>
            {/* PER CREARE MARGINI */}
            <Col className="mt-5 mb-4">
                <h1 className="fs-4 mt-5 fw-bold "><span className="border-art">Prodotti più venduti</span></h1>
            </Col>
          </Row>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {product && product.slice(0, visibleProducts).map((product) => (
            <Col key={product.productId} className=" py-2 px-2">
              <div className="shodow-p p-3 rounded-3" onClick={() => {navigate(`/product/${product.productId}`);}} style={{cursor:"pointer"}}>
                {/* Immagine Prodotto */}
              <div
                style={{
                  position: "relative",
                  width: "100%",   // Imposta la larghezza del contenitore all'immagine
                  paddingBottom: "65%",  // Rapporto d'aspetto 16:9 (9 / 16 * 100)
                  overflow: "hidden",  // Assicura che l'immagine non vada al di fuori del contenitore
                  borderRadius:"7px"
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
                  }}
                  
                />
                
              </div>
              {/* Contenuto */}
              <div>
                  <Row className="mt-3">
                    <Col xs={8}>
                        <p className="text-capitalize fs-5">{product.title}</p>
                        <h3>{product.price} €</h3>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                      <div className="a-b-o d-flex justify-content-center align-items-center rounded-pill" style={{width:"50px", height:"50px"}}>
                        <img src="/Cart-Stramb.svg" alt="cart-icon"/>
                      </div>
                    </Col>
                  </Row>
              </div>
              </div>
            </Col>
          ))}
        </Row>
        {/* Pulsante "Mostra altri" */}
        {visibleProducts < product.length && (
                <div className="text-center mt-4">
                    <Button variant="outline-dark" onClick={showMoreProducts} className="px-5 py-2">Mostra altro</Button>
                </div>
            )}
      </div>
      
    )
}
export default Product