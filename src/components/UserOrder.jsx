import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UserOrder(){
    const [myOrder, setMyOrder] = useState([])
    const navigate = useNavigate()

    const getMyAllOrder = () =>{
        fetch("http://localhost:3010/order/me",{
            headers:{Authorization:localStorage.getItem("tokenAdmin")}
        })
        .then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error("Errore nel recuperare i tuoi ordini")
            }
        })
        .then((data)=>{
            console.log("I tuoi ordini:")
            console.log(data)
            setMyOrder(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getMyAllOrder()
    },[])

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('it-IT', options);
      }

    return(
        <Container>
                <Row className="d-flex justify-content-center">
                    <Col md={8} className="mt-3">
                    {myOrder && myOrder.map((order, i)=>{
                        return(
                        <Row key={i} className="mb-4">
                            <Col className="border p-4 rounded-4">
                                <div className="d-flex justify-content-between border-bottom pb-2">
                                <p>Acquistato il: {formatDate(order.orderDate)} </p>
                                <p onClick={()=>{navigate(`/shop/${order.products[0].shop.shopId}`)}} className=" ms-2" style={{cursor:"pointer"}} > 
                                    Negozio: <span className="fw-bold">{order.products[0].shop.shopName}</span>
                                </p>
                                </div>
                                    {order.products && order.products.map((product, i)=>{
                                        return(
                                        <Row key={i} className="mt-4">
                                            <Col >
                                                <Row>
                                                    <Col xs={4} className="text-center">
                                                    <img src={product.photo1} alt={product.title} style={{width:"50px", height:"50px", objectFit:"cover"}}/>
                                                    </Col>
                                                    <Col className="d-flex align-items-center">
                                                    <p>{product.title}</p>
                                                    </Col>
                                                    <Col className="d-flex align-items-center justify-content-end">
                                                    <p>xxx €</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        )
                                    })}                                               
                            </Col>
                            <Col xs={3} className="d-flex flex-column align-items-center justify-content-center">
                            <h5>{(order.statusOrder == "IN_PROGRESS") ? "In consegna" : "Consegnato"}</h5>
                            <p>{(order.statusOrder == "DELIVERED") ? (<Button className="a-b-o px-5">Recensisci</Button>) : (<Button className="a-b-o px-5">Spedizione</Button>)}</p>
                            <Button className="bg-dark border-0 px-4">Visualizza Ricevuta</Button>
                            </Col>
                        </Row>
                        )
                    })}
                    </Col>
                </Row>
        </Container>
    )
}
export default UserOrder