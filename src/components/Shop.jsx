import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Shop(){
    const [shop, setShop] = useState([]);
    const navigate = useNavigate();

    const getShop = ()=>{
        fetch("http://localhost:3010/shop",{
            headers:{Authorization: localStorage.getItem("tokenAdmin")}
        }).then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error("Errore nel recupero dei Negozi")
            }
        })
        .then((data)=>{
            setShop(data.content)
            console.log("Shop:")
            console.log(data.content)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getShop()
    },[])

    return(
        <Container className="mt-5">
        <h1 className="fs-4">I Negozi di artesum:</h1>
        <Row xs={1} md={5} >
          {shop && shop.map((shop) => (
            <Col key={shop.shopId}>
              <div
                style={{
                  width: "100%",   // Imposta la larghezza del contenitore all'immagine
                  paddingBottom: "100%",  // Imposta l'altezza del contenitore come rapporto 1:1 rispetto alla larghezza
                  overflow: "hidden"  // Assicura che l'immagine non vada al di fuori del contenitore
                }}
              >
                <img
                  src={shop.logoShop}
                  alt={shop.shopName}
                  style={{
                    width: "100%",   // Assicura che l'immagine occupi l'intero spazio del contenitore
                    height: "100%",  // Assicura che l'immagine occupi l'intero spazio del contenitore
                    objectFit: "cover"  // Fai in modo che l'immagine copra l'intero spazio mantenendo le proporzioni
                  }}
                  onClick={() => {
                    navigate(`/shop/${shop.shopId}`); // Reindirizza all'URL del dettaglio del prodotto con l'ID dinamico
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    )
}
export default Shop