import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CheckCircle } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";

function OrderCompleted(){
    const { orderId } = useParams();
    const [order, setOrder] = useState(null)

const getOrderCompleted = (orderId) => {
    fetch(`http://localhost:3010/order/${orderId}`,{
        headers:{Authorization:localStorage.getItem("tokenAdmin")}
    })
    .then((res)=>{
        if(res.ok){
            return res.json()
        }else{
            throw new Error("Errore nel ricevere il tuo ultimo ordine")
        }
    })
    .then((data)=>{
        console.log(data)
        setOrder(data)
    })
    .catch((err)=>{
        console.log(err)
    })
}

useEffect(()=>{
    getOrderCompleted(orderId)
},[orderId])

    return(
        <Container>
            <Row className="d-flex flex-column align-items-center">
                <Col md={7} className="mt-5">
                    <h3 className="my-5 p-5 text-white search-custom d-flex align-items-center justify-content-center">
                        <CheckCircle className="me-3"/>Ordine completato con successo!</h3>
                    {order && 
                    <>
                    <div className="d-flex justify-content-between">
                    <p>STATO: {order.statusOrder}</p>
                    <p>Tipo di pagamento: {order.payment.paymentType}</p>
                    </div>                   
                    <p>Prodotti aquistati:</p>
                    {order && order.products && order.products.map((product, index) => (
                        <Row key={index} className="border my-1">
                            <Col xs={2}>
                            <img src={product.photo1} alt={product.title} style={{width:"80px", height:"80px", objectFit:"cover"}}/>
                            </Col>
                            <Col>
                            <p> {product.title}</p>
                            <p> {product.description}</p>
                            </Col>
                        </Row>
                        ))}
                    </>
                    }
                </Col>
           </Row>
        </Container>
    )
}
export default OrderCompleted