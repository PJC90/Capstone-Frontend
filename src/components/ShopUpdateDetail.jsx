import { useEffect, useState } from "react";
import {  Button, Col, Form, Row, Spinner } from "react-bootstrap";

import Checkmark from "./utils/Checkmark";


function ShopUpdateDetail({ shopId }){

    
    const [finishUpdate, setFinishUpdate] = useState(false)
    const [myShop, setMyShop] = useState(null);
    const [shopName, setShopName] = useState(null)
    const [nation, setNation] = useState(null)
    const [locality, setLocality] = useState(null)
    const [description, setDescription] = useState(null)
    const [cover, setCover] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [imageUploading, setImageUploading] = useState(false)
    const [imageUploading2, setImageUploading2] = useState(false)


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
                setShopName(null)
                setDescription(null)
                setNation(null)
                setLocality(null)
                setTimeout(()=>{
                    setFinishUpdate(false)
                },5000)
                
            }else{
                throw new Error("Errore nel modificare i dati")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    

    const data = new FormData();
    if (cover) {
        data.append("cover", cover[0]);
    }


    const uploadCover = (shopId)=>{
        fetch(`http://localhost:3010/shop/${shopId}/covershop`,{
            method: "PATCH",
            headers:{
                Authorization: localStorage.getItem("tokenAdmin"),
                Accept: "application/json",
            },
            body: data,
        })
        .then((res)=>{
            if(res.ok){
                console.log("immagine caricata con successo") 
                setImageUploading(false)           
            }else{
                throw new Error("Errore nel caricare la cover del negozio: " + res.statusText)
            }
        })
        .catch((err)=>{
            console.log("Errore " + err)
        })
    }

    const data2 = new FormData();
    if (photo) {
        data2.append("photo", photo[0]);
    }


    const uploadPhoto = (shopId)=>{
        fetch(`http://localhost:3010/shop/${shopId}/photoshop`,{
            method: "PATCH",
            headers:{
                Authorization: localStorage.getItem("tokenAdmin"),
                Accept: "application/json",
            },
            body: data2,
        })
        .then((res)=>{
            if(res.ok){
                console.log("immagine caricata con successo") 
                setImageUploading2(false)           
            }else{
                throw new Error("Errore nel caricare la foto del negozio: " + res.statusText)
            }
        })
        .catch((err)=>{
            console.log("Errore " + err)
        })
    }

    useEffect(()=>{
        getMySingleShop(shopId)
      },[shopId, imageUploading, imageUploading2, finishUpdate])


    return(
        <>
                {myShop && 
                <>
                <h4 className="fw-bold text-center mt-4"><span className=" border-art">Modifica i dettagli del negozio</span></h4>
                <Row className="mx-5 d-flex justify-content-center">
                    <Col style={{height:"300px"}} className="mt-3 " xs={8}>      
                    <div style={{position:"relative"}}>
                        <img src={myShop.coverImageShop} alt={myShop.shopName} className="img-fluid w-100 rounded-2" style={{height:"300px", objectFit: 'cover', position:"absolute"}}/>
                        <div style={{position:"absolute", bottom:"-285px", right:"10px"}}>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    uploadCover(shopId);
                                    setImageUploading(true);
                                }}
                                >
                                <div className="d-flex align-items-center">
                                    <Button type="submit" variant="dark" className="me-4 py-1 border border-white">
                                        {imageUploading ? 
                                                (<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>) 
                                                : 
                                                ("Upload")}
                                    </Button>
                                    <Form.Control 
                                    className="custom-file-input" 
                                    type="file"
                                    size="sm"
                                    required
                                    onChange={(e)=>{setCover(e.target.files)}}
                                    />
                                </div>
                                </Form>
                        </div>
                    </div>     
                    </Col>
                        </Row>   
                <Row className=" mx-5 d-flex justify-content-center">
                    <Col xs={3}>
                    <img src={myShop.logoShop} alt={myShop.shopName} className="img-fluid w-100 mt-3 rounded-2" style={{height:"320px", objectFit: 'cover'}}/>
                    <Form className="mt-0 d-flex justify-content-center" onSubmit={(e) => {
                        e.preventDefault();
                        uploadPhoto(shopId);
                        setImageUploading2(true);}}>
                            <Button type="submit" variant="dark" className="me-4 mt-3 border border-white">
                                                    {imageUploading2 ? 
                                                    (<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>) 
                                                    : 
                                                    ("Upload")}
                                </Button>
                                   <Form.Control style={{width:"280px"}} className="mt-4 custom-file-input" 
                                  type="file"
                                  size="sm"
                                  required
                                 onChange={(e)=>{setPhoto(e.target.files)}} />
                            </Form>
                    </Col>
                    <Col xs={5}> 
                    <Form className="mx-5 pe-5"
                    onSubmit={(e)=>{
                        e.preventDefault(); 
                        updateMySingleShop(shopId)
                        }}>
                    <p className="fs-6 mt-4">Nome Negozio: <span className="fw-bold text-capitalize">{myShop.shopName} </span></p>
                    <Form.Control
                            type="text"
                            placeholder="Cambia il nome del negozio"
                            value={shopName}
                            onChange={(e)=>{setShopName(e.target.value)}}
                            className="border-black mb-3"
                            style={{borderColor:"rgb(0, 140, 255)"}}
                        />
                    <p className="fs-6">Descrizione: <span className="fw-bold">{myShop.description} </span></p>
                    <Form.Control
                            type="text"
                            placeholder="Cambia la descrizione del negozio"
                            value={description}
                            onChange={(e)=>{setDescription(e.target.value)}}
                            className="border-black mb-3"
                            style={{borderColor:"rgb(0, 140, 255)"}}
                        />
                    <p className="fs-6 ">Nazione: <span className="fw-bold">{myShop.nation} </span> </p>
                    <Form.Control
                            type="text"
                            placeholder="Cambia La nazione di dove si trova il negozio"
                            value={nation}
                            onChange={(e)=>{setNation(e.target.value)}}
                            className="border-black mb-3"
                            style={{borderColor:"rgb(0, 140, 255)"}}
                        />
                    <p className="fs-6">Località: <span className="fw-bold">{myShop.locality} </span></p>
                    <Form.Control
                            type="text"
                            placeholder="Cambia la località del negozio"
                            value={locality}
                            onChange={(e)=>{setLocality(e.target.value)}}
                            className="border-black mb-1"
                            style={{borderColor:"rgb(0, 140, 255)"}}
                        />
                        <div className="d-flex align-items-center">
                            <Button type="submit" className="my-3 a-b-o me-5">Modifica</Button>
                            {finishUpdate && <Checkmark/>  }
                        </div>
                    </Form>
                    </Col>

                </Row>
                </>
                }
                    
        </>
    )
}
export default ShopUpdateDetail;