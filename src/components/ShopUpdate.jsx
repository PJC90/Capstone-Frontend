import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ArchiveFill, BarChartFill, BoxSeamFill, ChatRightFill, PencilFill, XCircleFill } from "react-bootstrap-icons";
import {  useNavigate } from "react-router-dom";
import ShopUpdateDetail from "./ShopUpdateDetail";
import ShopDelete from "./ShopDelete";


function ShopUpdate(){
 const navigate = useNavigate();
 const [formDelete, setFormDelete] = useState(false)
 const [idFormDelete, setIdFormDelete] = useState(false)
 const [updateMyShop, setUpdateMyShop] = useState([]);
 const [selectedShop, setSelectedShop] = useState(null);
 const [viewEditShop, setViewEditShop] = useState(false);


    const getMyShop = ()=>{
      fetch("http://localhost:3010/shop/myshop",{
        headers:{Authorization: localStorage.getItem("tokenAdmin")},
      })
      .then((res)=>{
        if(res.ok){
          return res.json();
        }else{
          throw new Error("Errore nel recupare i tuoi negozi")
        }
      })
      .then((data)=>{
        setUpdateMyShop(data);
        console.log("I miei negozi:");
        console.log(updateMyShop);
      })
      .catch((err)=>{
        console.log(err)
      })
    }


    useEffect(()=>{
      getMyShop();
    },[])

    const handleEditShop = (shopId) => {
        setSelectedShop(shopId);
    };
    const handleDeleteShop = (shopId) => {
        setIdFormDelete(shopId);
    };
    const handleFormeDelete = () => {
      if(viewEditShop){
        setViewEditShop(!viewEditShop)
      }
    }
    const handleViewEditShop = () => {
      if(formDelete){
        setFormDelete(!formDelete)
      }
    }


    return(
        
        <Container fluid  style={{height:"100vh"}}>
            <Row className="d-flex justify-content-start h-100" >
 {/*-------------------------------------------------------------------- SIDEBAR ------------------------------------------------------------------------------               */}
                <Col xs={2} className="border-2 border-end d-flex flex-column" >
 {/* Se non hai negozi compare una schermata per aprire un nuovo negozio */}
         {updateMyShop.length > 0 ? (
             updateMyShop.map((myshop) => (
                    <Row key={myshop.shopId} className="mt-5">
                        <Col className="d-flex flex-column align-items-start"> 
                        <p className="my-1 ">{myshop.shopName}</p>
                        <Button className="my-3 rounded-pill icon-effect" onClick={() => {handleViewEditShop(); setViewEditShop(!viewEditShop); handleEditShop(myshop.shopId)}}>
                        <PencilFill/> Modifica negozio 
                        </Button>
                        <Button className="my-3 rounded-pill icon-effect"><BoxSeamFill/> Inserzioni</Button>
                        <Button className="my-3 rounded-pill icon-effect"><ArchiveFill/> Ordini</Button>
                        <Button className="my-3 rounded-pill icon-effect"><BarChartFill/> Statistiche</Button>
                        <Button className="my-3 rounded-pill icon-effect"><ChatRightFill/> Messaggi</Button>
                        <Button className="my-3 rounded-pill icon-effect" onClick={()=>{handleFormeDelete();setFormDelete(!formDelete); handleDeleteShop(myshop.shopId)}}>
                          <XCircleFill/> Elimina Negozio</Button>
                        </Col>
                    </Row>
        ))
    ) : (
        <Row>
            <Col > 
            <p className="mt-5 ">Non hai ancora un negozio</p>
            <p >Vuoi crearlo?</p>
            <Button className="rounded-pill icon-effect" onClick={()=>{navigate("/becomeseller")}}>Crea un negozio</Button>
            </Col>
        </Row>
    )}
                </Col>
 {/*-------------------------------------------------------------------- CONTENT-----------------------------------------------------------                */}
               
                <Col>
                {viewEditShop &&
                    <ShopUpdateDetail shopId={selectedShop}/>
                }
                {formDelete && 
                    <ShopDelete shopId={idFormDelete}/>                
                }
                </Col>
               
            </Row>
            
        </Container>
        
    )
}
export default ShopUpdate