import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";

function ShopDelete({ shopId }){

    const [myShop, setMyShop] = useState(null)
    const [showDeleteMessage, setShowDeleteMessage] = useState(false)

    const getMySingleShop = (shopId)=>{
        fetch(`http://localhost:3010/shop/${shopId}`,{
          headers:{Authorization: localStorage.getItem("tokenAdmin")},
        })
        .then((res)=>{
          if(res.ok){
            return res.json();
          }else{
            throw new Error("Errore nel recupare il tuo negozio");
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

const deleteMySingleShop = (shopId)=>{
        const confirmDelete = window.confirm("Sei sicuro di voler eliminare il tuo negozio?");
        if(!confirmDelete) return;

        fetch(`http://localhost:3010/shop/${shopId}`,{
            method: "DELETE",
            headers:{
                Authorization: localStorage.getItem("tokenAdmin")
            },
        })
        .then((res)=>{
            if(res.ok){
                console.log("Negozio eliminato" + res);  
                setShowDeleteMessage(true)
                setTimeout(()=>{
                    window.location.reload()
                    setShowDeleteMessage(false);
                },2000)
            }else{
                confirm("Non è possibile cancellare questo negozio. Devi cancellare prima i prodotti a esso collegato.")
                throw new Error("Errore nell' eliminare il tuo negozio")
            }
        })
        .catch((err)=>{
            console.log(err)
        })      
    }

    const handleDeleteShop = () =>{
deleteMySingleShop(shopId);
    }

useEffect(()=>{
        getMySingleShop(shopId)
      },[shopId])

    return(
        <Container>
            {myShop && 
            <>
                <Row className="mt-5">
                    <Col xs={2}>
                    <img src={myShop.logoShop} alt={myShop.shopName} style={{width:"100%", height:"100%"}}/>
                    </Col>
                    <Col  >
                        <p>Negozio di : {myShop.seller.name} {myShop.seller.surname}</p>
                        <p className="fs-6 fw-bold">Nome Negozio: {myShop.shopName}</p>
                        <p >Nazione: {myShop.nation} </p>
                        <p >Località: {myShop.locality} </p>
                        <p >Num Vendite: {myShop.numberOfSales} </p>
                    </Col>
                </Row>
                <Button className="mt-5 px-5 icon-effect border border-2 rounded-pill" onClick={handleDeleteShop}>
                    Elimina Negozio
                </Button>
                {showDeleteMessage &&
                <Alert className="mt-5">Negozio Eliminato!</Alert>
                }
            </>
            }
        </Container>
    )
}
export default ShopDelete