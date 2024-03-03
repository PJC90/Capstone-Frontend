import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

function Shop(){
    const [shop, setShop] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(5);

    const navigate = useNavigate();

    const getShop = ()=>{
        fetch("http://localhost:3010/shop?page=0&size=100&order=shopId",{
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
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const showMoreProducts = () => {
      setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 5);
  };

    useEffect(()=>{
        getShop()
    },[])

    return(
      <div style={{width:"82%", margin:"0 auto"}} >
      <Row >
        <Col className="mt-5 mb-4">
            <h1 className="fs-4 mt-5 fw-bold "><span className="border-art">Scopri i negozi</span></h1>
        </Col>
      </Row>
    <Row xs={1} md={2} lg={3} xl={5} className="g-4 ">
          {shop && shop.slice(0, visibleProducts).map((shop) => (
            <Col key={shop.shopId} className="d-flex mb-5">
              <div className="d-flex flex-column shodow-p p-3 rounded-3" onClick={() => {navigate(`/shop/${shop.shopId}`); }} style={{cursor:"pointer"}}>
              <div style={{
                          width: "250px", // Imposta la larghezza desiderata del div
                          height: "250px", // Imposta l'altezza desiderata del div
                          overflow: "hidden", // Assicura che le immagini non fuoriuscano dai confini del div
                      }}>
                <img
                  src={shop.logoShop}
                  alt={shop.shopName}
                  style={{
                    width: "100%", 
                    height:"100%",                     
                    objectFit: "cover",  // Fai in modo che l'immagine copra l'intero spazio mantenendo le proporzioni
                  }}
                  
                />
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center mt-3">          
                    <h1 className="fs-4 fw-bold border-art">{shop.shopName}</h1>             
                    <p className="mb-1">{shop.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        {/* Pulsante "Mostra altri" */}
        {visibleProducts < shop.length && (
                <div className="text-center ">
                    <Button variant="outline-dark" onClick={showMoreProducts} className="px-5 py-2">Mostra altro</Button>
                </div>
            )}
      </div>
    )
}
export default Shop