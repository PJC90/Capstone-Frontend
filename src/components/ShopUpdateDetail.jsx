import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { HeartFill, PencilSquare } from "react-bootstrap-icons";



function ShopUpdateDetail({ shopId }){
    const [update, setUpdate] = useState(false)
    const [update2, setUpdate2] = useState(false)
    const [update3, setUpdate3] = useState(false)
    const [update4, setUpdate4] = useState(false)
    const [finishUpdate, setFinishUpdate] = useState(false)
    const [myShop, setMyShop] = useState(null);
    const [shopName, setShopName] = useState(null)
    const [nation, setNation] = useState(null)
    const [locality, setLocality] = useState(null)
    const [description, setDescription] = useState(null)


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
    const payload = {
        description : description,
        locality: locality,
        nation: nation,
        shopName: shopName
    }
    
    const updateMySingleShop = (shopId)=>{
        fetch(`http://localhost:3010/shop/${shopId}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("tokenAdmin")
            },
            body: JSON.stringify(payload),
        })
        .then((res)=>{
            if(res.ok){
                console.log("dati modificati" + res);
                setFinishUpdate(true)
                setTimeout(()=>{
                    setFinishUpdate(false)
                    setMyShop(!myShop)
                    window.location.reload()
                },3000)
                
            }else{
                throw new Error("Errore nel modificare i dati")
            }
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
                    <Row className="d-flex justify-content-start">
                    <Col xs={8} > 
                    <Form onSubmit={(e)=>{e.preventDefault(); updateMySingleShop(shopId)}}>
                    <p className="my-5 fs-5">Negozio di {myShop.seller.name} {myShop.seller.surname}:</p>
                    <p className="fs-6">Nome Negozio:</p>
                    <p className="fs-6 fw-bold">{myShop.shopName} <PencilSquare style={{cursor:"pointer"}} onClick={()=>{setUpdate(!update)}}/></p>
                    {update && <Form.Control
                            type="text"
                            placeholder="Cambia il nome del negozio"
                            value={shopName}
                            onChange={(e)=>{setShopName(e.target.value)}}
                            className="border-black mb-3"
                            style={{borderColor:"rgb(0, 140, 255)"}}
                        />}
                    <p className="fs-6">Descrizione:</p>
                    <p className="fs-6 fw-bold">{myShop.description} <PencilSquare style={{cursor:"pointer"}} onClick={()=>{setUpdate2(!update2)}}/></p>
                    {update2 && <Form.Control
                            type="text"
                            placeholder="Cambia la descrizione del negozio"
                            value={description}
                            onChange={(e)=>{setDescription(e.target.value)}}
                            className="border-black mb-3"
                            style={{borderColor:"rgb(0, 140, 255)"}}
                        />}
                    <p className="fs-6">Nazione:</p>
                    <p className="fs-6 fw-bold">{myShop.nation} <PencilSquare style={{cursor:"pointer"}} onClick={()=>{setUpdate3(!update3)}}/></p>
                    {update3 && <Form.Control
                            type="text"
                            placeholder="Cambia La nazione di dove si trova il negozio"
                            value={nation}
                            onChange={(e)=>{setNation(e.target.value)}}
                            className="border-black mb-3"
                            style={{borderColor:"rgb(0, 140, 255)"}}
                        />}
                    <p className="fs-6">Località: {myShop.locality}</p>
                    <p className="fs-6 fw-bold">{myShop.locality} <PencilSquare style={{cursor:"pointer"}} onClick={()=>{setUpdate4(!update4)}}/></p>
                    {update4 && <Form.Control
                            type="text"
                            placeholder="Cambia la località del negozio"
                            value={locality}
                            onChange={(e)=>{setLocality(e.target.value)}}
                            className="border-black mb-3"
                            style={{borderColor:"rgb(0, 140, 255)"}}
                        />}
                    {(update || update2 || update3 || update4) && <Button type="submit" className="my-4 icon-effect border border-black">Modifica</Button>}
                    </Form>
                    </Col>
                </Row>
                }
                    {finishUpdate &&
                <Alert>Modifica effettuata con successo!</Alert>
                }
        </Container>
    )
}
export default ShopUpdateDetail