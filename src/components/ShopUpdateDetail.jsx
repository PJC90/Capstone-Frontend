import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";


function ShopUpdateDetail({ shopId }){
    
    const [myShop, setMyShop] = useState(null);


    const getMySingleShop = (shopId)=>{
      fetch(`http://localhost:3010/shop/${shopId}`,{
        headers:{Authorization: localStorage.getItem("tokenAdmin")},
      })
      .then((res)=>{
        if(res.ok){
          return res.json();
        }else{
          throw new Error("Errore nel recupare il tuo negozio")
        }
      })
      .then((data)=>{
        setMyShop(data);
        console.log("Il mio negozio:");
        console.log(data);
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    useEffect(()=>{
        getMySingleShop(shopId)
      },[shopId])


    return(
        <Container>
                {myShop && 
                    <Row className="d-flex justify-content-center text-center">
                    <Col xs={8} > 
                    <p className="my-3 fs-1">Negozio di {myShop.seller.name} {myShop.seller.surname}:</p>
                    <p className="my-3 fs-1">Descrizione: {myShop.description}</p>
                    <p className="my-3 fs-1">Località: {myShop.locality}</p>
                    </Col>
                </Row>
                }
        </Container>
    )
}
export default ShopUpdateDetail