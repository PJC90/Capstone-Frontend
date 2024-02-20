import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
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
                setShopName("")
                setUpdate(false)
                setDescription("")
                setUpdate2(false)
                setNation("")
                setUpdate3(false)
                setLocality("")
                setUpdate4(false)
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
                <Row>
                    <Col xs={12} style={{height:"300px"}} className="mt-3">      
                    <div style={{position:"relative"}}>
                        <img src={myShop.coverImageShop} alt={myShop.shopName} className="img-fluid w-100" style={{height:"300px", objectFit: 'cover', position:"absolute"}}/>
                        <div style={{position:"absolute", bottom:"-285px", right:"10px"}}>
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    uploadCover(shopId);
                                    setImageUploading(true);
                                }}
                                >
                                <div className="d-flex align-items-center">
                                    <Button type="submit" className="bg-white text-black border border-1  me-2 py-1">{imageUploading ? (<Spinner/>) : ("Upload")}</Button>
                                    <Form.Control
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
                    <Row className="d-flex justify-content-start">
                    <Col xs={3}>
                    <img src={myShop.logoShop} alt={myShop.shopName} className="img-fluid w-100 mt-3" style={{height:"320px", objectFit: 'cover'}}/>
                    <Form className="mt-0 d-inline-block" onSubmit={(e) => {
                        e.preventDefault();
                        uploadPhoto(shopId);
                        setImageUploading2(true);}}>
                            <Button type="submit" className="bg-white text-black border border-1 mt-2 py-1 d-inline-block">{imageUploading2 ? (<Spinner/>) : ("Upload")}</Button>
                                   <Form.Control
                                  type="file"
                                  size="sm"
                                  required
                                 onChange={(e)=>{setPhoto(e.target.files)}} />
                            </Form>
                    </Col>
                    <Col xs={3}> 
                    <Form onSubmit={(e)=>{
                        e.preventDefault(); 
                        updateMySingleShop(shopId)
                        }}>
                    <p className="mt-4 fs-5">Negozio di {myShop.seller.name} {myShop.seller.surname}:</p>
                    <p className="fs-6 ">Nome Negozio: <span className="fw-bold">{myShop.shopName} </span><PencilSquare style={{cursor:"pointer"}} onClick={()=>{setUpdate(!update)}}/></p>
                    {update && <Form.Control
                            type="text"
                            placeholder="Cambia il nome del negozio"
                            value={shopName}
                            onChange={(e)=>{setShopName(e.target.value)}}
                            className="border-black mb-3"
                            style={{borderColor:"rgb(0, 140, 255)"}}
                        />}
                    <p className="fs-6">Descrizione: <span className="fw-bold">{myShop.description} </span><PencilSquare style={{cursor:"pointer"}} onClick={()=>{setUpdate2(!update2)}}/></p>
                    {update2 && <Form.Control
                            type="text"
                            placeholder="Cambia la descrizione del negozio"
                            value={description}
                            onChange={(e)=>{setDescription(e.target.value)}}
                            className="border-black mb-3"
                            style={{borderColor:"rgb(0, 140, 255)"}}
                        />}
                    <p className="fs-6 ">Nazione: <span className="fw-bold">{myShop.nation} </span> <PencilSquare style={{cursor:"pointer"}} onClick={()=>{setUpdate3(!update3)}}/></p>
                    {update3 && <Form.Control
                            type="text"
                            placeholder="Cambia La nazione di dove si trova il negozio"
                            value={nation}
                            onChange={(e)=>{setNation(e.target.value)}}
                            className="border-black mb-3"
                            style={{borderColor:"rgb(0, 140, 255)"}}
                        />}
                    <p className="fs-6">Località: <span className="fw-bold">{myShop.locality} </span> <PencilSquare style={{cursor:"pointer"}} onClick={()=>{setUpdate4(!update4)}}/></p>
                    {update4 && <Form.Control
                            type="text"
                            placeholder="Cambia la località del negozio"
                            value={locality}
                            onChange={(e)=>{setLocality(e.target.value)}}
                            className="border-black mb-1"
                            style={{borderColor:"rgb(0, 140, 255)"}}
                        />}
                    {(update || update2 || update3 || update4) && <Button type="submit" className="my-3 icon-effect border border-black">Modifica</Button>}
                    </Form>
                    {finishUpdate &&
                <Alert>Modifica effettuata con successo!</Alert>
                    }
                    </Col>
                    <Col className="d-flex justify-content-end mt-3">
                        
                    </Col>
                </Row>
                </>
                }
                    
        </>
    )
}
export default ShopUpdateDetail;