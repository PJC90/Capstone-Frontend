import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ArchiveFill, BarChartFill, BoxSeamFill, ChatRightFill, PencilFill, XCircleFill } from "react-bootstrap-icons";
import {  useNavigate } from "react-router-dom";
import ShopUpdateDetail from "./ShopUpdateDetail";
import ShopDelete from "./ShopDelete";
import ShopUpdateProduct from "./ShopUpdateProduct";


function ShopUpdate(){
 const navigate = useNavigate();
 const [formDelete, setFormDelete] = useState(false)
 const [updateMyShop, setUpdateMyShop] = useState([]);
 const [selectedShop, setSelectedShop] = useState(null);
 const [viewEditShop, setViewEditShop] = useState(false);
 const [viewProductShop, setViewProductShop] = useState(false)


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
    
    const handleFormeDelete = () => {
      if(viewEditShop){
        setViewEditShop(!viewEditShop)
      } else if(viewProductShop){
        setViewProductShop(!viewProductShop)
      }
    }
    const handleViewEditShop = () => {
      if(formDelete){
        setFormDelete(!formDelete)
      }else if(viewProductShop){
        setViewProductShop(!viewProductShop)
      }
    }
    const handleViewProductShop = () =>{
      if(viewEditShop){
        setViewEditShop(!viewEditShop)
      } else if(formDelete){
        setFormDelete(!formDelete)
      }
    }


    return(
        
        <Container fluid  style={{height:"100vh"}}>
            <Row className="d-flex justify-content-start h-100" >
 {/*-------------------------------------------------------------------- LEFT SIDEBAR ------------------------------------------------------------------------------               */}
                <Col xs={2} className="d-flex flex-column" style={{boxShadow:"25px 0px 20px -20px rgba(0,0,0,0.1)"}}>
 {/* Se non hai negozi compare una schermata per aprire un nuovo negozio */}
         {updateMyShop.length > 0 ? (
             updateMyShop.map((myshop) => (
                    <Row key={myshop.shopId} className="mt-5">
                        <Col className="d-flex flex-column align-items-start"> 
                        <p className="my-1 ">{myshop.shopName}</p>
                        <Button className="my-3 rounded-pill icon-effect" onClick={() => {handleViewEditShop(); setViewEditShop(!viewEditShop); handleEditShop(myshop.shopId)}}>
                        <PencilFill/> Modifica negozio 
                        </Button>
                        <Button className="my-3 rounded-pill icon-effect" onClick={()=>{handleViewProductShop(); setViewProductShop(!viewProductShop); handleEditShop(myshop.shopId)}}>
                          <BoxSeamFill/> Inserzioni</Button>
                        <Button className="my-3 rounded-pill icon-effect"><ArchiveFill/> Ordini</Button>
                        <Button className="my-3 rounded-pill icon-effect"><BarChartFill/> Statistiche</Button>
                        <Button className="my-3 rounded-pill icon-effect"><ChatRightFill/> Messaggi</Button>
                        <Button className="my-3 rounded-pill icon-effect" onClick={()=>{handleFormeDelete();setFormDelete(!formDelete); handleEditShop(myshop.shopId)}}>
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
 {/*-------------------------------------------------------------------- CONTENT (Right Page)    -----------------------------------------------------------                */}
               
                <Col className="p-0">
                {viewEditShop &&
                    <ShopUpdateDetail shopId={selectedShop}/>
                }
                {formDelete && 
                    <ShopDelete shopId={selectedShop}/>                
                }
                {viewProductShop &&
                  <ShopUpdateProduct shopId={selectedShop}/>
                }
                </Col>
               
            </Row>
            
        </Container>
        
    )
}
export default ShopUpdate