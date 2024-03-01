import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import Review from "./Review";

function UserOrder(){
    const [myOrder, setMyOrder] = useState([])
    const [review, setReview] = useState({})
    const [showModal, setShowModal] = useState({});
    const [showModalReview, setShowModalReview] = useState({});

    // Funzione per gestire l'apertura/chiusura del modale per un determinato prodotto
    const handleToggleModal = (productId) => {
        setShowModalReview(prevState => ({
            ...prevState,
            [productId]: !prevState[productId] // Inverti lo stato corrente del modale per il prodotto specificato
        }));
    };

    const handleShow = (modalId) => {
        setShowModal(prevState => ({
            ...prevState,
            [modalId]: true
        }));
    };
    
    const handleClose = (modalId) => {
        setShowModal(prevState => ({
            ...prevState,
            [modalId]: false
        }));
    };

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

    const getReviewByProductBuyed = (productId, shopId, orderId) => {
        fetch(`http://localhost:3010/review/filterReview?productId=${productId}&shopId=${shopId}&orderId=${orderId}`, {
            headers: {Authorization: localStorage.getItem("tokenAdmin")}
        })
        .then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error("Errore nel ricevere Recensione dal prodotto acquistato")
            }
        })
        .then((data)=>{
            console.log("Recensione dal prodotto acquistato:")
            console.log(data)
            setReview(prevReviews => ({
                ...prevReviews,
                [`${productId}-${orderId}`]: data
            }));
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getMyAllOrder()
    },[])

    useEffect(() => {
        // Verifica se ci sono prodotti nell'ordine prima di caricare le recensioni
        if (myOrder.length > 0) {
            // Loop attraverso ogni ordine e ottieni la recensione
            myOrder.forEach(order => {
                const orderId = order.orderId;
                order.products.forEach(product => {
                    getReviewByProductBuyed(product.productId, product.shop.shopId, orderId); // Passa l'orderId
                });
            });
        }
    }, [myOrder, showModalReview]);


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
                                                    <Col xs={2} className="text-center">
                                                    <img src={product.photo1} alt={product.title} style={{width:"50px", height:"50px", objectFit:"cover"}}/>
                                                    </Col>
                                                    <Col className="d-flex align-items-center">
                                                    <p>{product.title}</p>
                                                    </Col>
                                                    <Col className="d-flex align-items-center justify-content-center" xs={4}>
                                                    <p>
                                                    {review[`${product.productId}-${order.orderId}`] ? 
                                                    <div>
                                                        <div onClick={() => handleShow(`${product.productId}-${order.orderId}`)} style={{cursor:"pointer"}} className="me-3">
                                                        <StarRating rating={review[`${product.productId}-${order.orderId}`].rating} />
                                                     </div>
                                                       
                                                        <Modal centered show={showModal[`${product.productId}-${order.orderId}`]} onHide={() => handleClose(`${product.productId}-${order.orderId}`)}>
                                                            <Modal.Header closeButton>
                                                            <Modal.Title>
                                                                <p className="fs-6 mb-0">
                                                                Recensito il {review[`${product.productId}-${order.orderId}`].dateReview}
                                                                </p>
                                                            </Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                            <div className="py-1 d-flex justify-content-center">
                                                                <StarRating rating={review[`${product.productId}-${order.orderId}`].rating} />
                                                            </div>
                                                            <div className="text-center mt-3">
                                                                <img src={review[`${product.productId}-${order.orderId}`].photoReview} 
                                                                style={{width:"200px", height:"200px", objectFit:"cover"}}
                                                                alt="image-review"/>
                                                            </div>
                                                            </Modal.Body>
                                                            <Modal.Footer>                                                         
                                                            <Modal.Body>
                                                                <p>
                                                                Descrizione:
                                                                </p>
                                                                <p>
                                                                {review[`${product.productId}-${order.orderId}`].description}
                                                                </p>
                                                            </Modal.Body>                                                          
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </div>    
                                                        : 
                                                    <div className="icon-effect px-2 rounded-pill" style={{cursor:"pointer"}}>
                                                        <p onClick={() => handleToggleModal(product.productId)} className="m-0 p-0">Scrivi una recensione</p>
                                                        {showModalReview[product.productId] &&
                                                         <Review orderId={order.orderId} productId={product.productId} shopId={product.shop.shopId} onClose={() => handleToggleModal(product.productId)}/>
                                                        }
                                                    </div>
                                                    }                                               
                                                    </p>
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
                            <Button className="a-b-o px-4">Visualizza Ricevuta</Button>
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