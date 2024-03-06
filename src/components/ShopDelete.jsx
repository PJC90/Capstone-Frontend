import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import Checkmark from "./utils/Checkmark";

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
                    <Col>
                        <div style={{position:"relative"}}>
                            <img src={myShop.coverImageShop} alt={myShop.shopName} className="img-fluid w-100 rounded-3" style={{height:"200px", objectFit: 'cover'}}/>
                            <div style={{position:"absolute", left:"40px", bottom:"-20px"}}>
                                <div className="p-1 bg-white rounded-3">
                                    <img src={myShop.logoShop} alt={myShop.shopName}  style={{width:"100px"}} className="rounded-3"/>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col className="d-flex flex-column justify-content-center" >
                        <p className="fs-6 fw-bold text-capitalize fs-4"><span className="border-art">{myShop.shopName}</span></p>
                        <p>di <span className="text-capitalize fw-bold">{myShop.seller.name} {myShop.seller.surname}</span></p>
                        <p className="text-capitalize"> {myShop.nation} ({myShop.locality}) </p>
                        <p >{myShop.numberOfSales} Vendite</p>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-5">
                    <p>Ci dispiace che tu non voglia proseguire questa avventura</p>
                    <p>Eliminando il Negozio ogni modifica andrà persa</p>
                    </Col>
                </Row>
                <Button variant="dark" className="mt-2 px-5" onClick={handleDeleteShop}>
                    Elimina Negozio
                </Button>
                {showDeleteMessage &&
                (<div className="mt-3"><Checkmark/></div>)
                }
            </>
            }
        </Container>
    )
}
export default ShopDelete