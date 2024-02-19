import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { HeartFill } from "react-bootstrap-icons";



function ShopUpdateDetail({ shopId }){
    const [update, setUpdate] = useState(false)
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
                },4000)
                
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
                    <Row className="d-flex justify-content-center text-center">
                    <Col xs={8} > 
                    <Form onSubmit={(e)=>{e.preventDefault(); updateMySingleShop(shopId)}}>
                    <p className="my-3 fs-1">Negozio di {myShop.seller.name} {myShop.seller.surname}:</p>
                    <p className="my-3 fs-1">Nome Negozio {myShop.shopName}</p>
                    <HeartFill onClick={()=>{setUpdate(!update)}}/>
                    {update && <Form.Control
                            type="text"
                            placeholder="Cambia il nome del negozio"
                            value={shopName}
                            onChange={(e)=>{setShopName(e.target.value)}}
                            className="rounded-pill px-5 py-3 border-3 text-info"
                            style={{borderColor:"rgb(0, 140, 255)"}}
                        />}
                    <p className="my-3 fs-1">Descrizione: {myShop.description}</p>
                    <Form.Control
                            type="text"
                            placeholder="Cambia la descrizione del negozio"
                            value={description}
                            onChange={(e)=>{setDescription(e.target.value)}}
                            className="rounded-pill px-5 py-3 border-3 text-info"
                            style={{borderColor:"rgb(0, 140, 255)"}}
                        />
                    <p className="my-3 fs-1">Nazione: {myShop.nation}</p>
                    <Form.Control
                            type="text"
                            placeholder="Cambia La nazione di dove si trova il negozio"
                            value={nation}
                            onChange={(e)=>{setNation(e.target.value)}}
                            className="rounded-pill px-5 py-3 border-3 text-info"
                            style={{borderColor:"rgb(0, 140, 255)"}}
                        />
                    <p className="my-3 fs-1">Località: {myShop.locality}</p>
                    <Form.Control
                            type="text"
                            placeholder="Cambia la località del negozio"
                            value={locality}
                            onChange={(e)=>{setLocality(e.target.value)}}
                            className="rounded-pill px-5 py-3 border-3 text-info"
                            style={{borderColor:"rgb(0, 140, 255)"}}
                        />
                    <Button type="submit">Modifica</Button>
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