import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import Review from "./Review";
import { EyeFill } from "react-bootstrap-icons";

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
                    {myOrder && 
                            myOrder
                            .slice() // Crea una copia dell'array degli ordini
                            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)) // Ordina in base alla data dell'ordine
                            .map((order, i)=>{
                        return(
                        <Row key={i} className="mb-4 d-flex justify-content-center">
                            <Col className=" px-4 pt-3  shodow-p-nh rounded-3 bg-body-tertiary" xs={10}>
                                <div className="d-flex justify-content-between border-bottom pb-3">
                                    <div>
                                        <p className="m-0 p-0 text-body-tertiary">Acquistato il: <span className="text-black">{formatDate(order.orderDate)}</span> </p>
                                        <p className="m-0 p-0 text-body-tertiary">Spedizione: <span className="text-black">{(order.statusOrder == "IN_PROGRESS") ? "In consegna" : "Consegnato"}</span></p>
                                    </div>

                                    <div className="d-flex align-items-center">
                                    <p onClick={()=>{navigate(`/shop/${order.products[0].shop.shopId}`)}} className=" m-0" style={{cursor:"pointer"}} > 
                                        Negozio: <span className="fw-bold">{order.products[0].shop.shopName}</span>
                                    </p>
                                    </div>
                                </div>
                                    {order.products && order.products.map((product, i)=>{
                                        return(
                                        <Row key={i} className="mt-4 ">
                                            <Col >
                                                <Row>
                                                    <Col xs={2} className="text-center p-0">
                                                    <img src={product.photo1} alt={product.title} className="rounded-2 " style={{width:"80px", height:"60px", objectFit:"cover"}}/>
                                                    </Col>
                                                    <Col className="d-flex align-items-center p-0">
                                                    <p ><span className="border-art-light fw-bold">{product.title}</span></p>
                                                    </Col>
                                                    <Col className="d-flex align-items-center justify-content-end pe-0" xs={4}>
                                                    <p>
                                                    {review[`${product.productId}-${order.orderId}`] ? 
                                                    <div>
                                                        <div className="d-flex align-items-center">
                                                        <StarRating rating={review[`${product.productId}-${order.orderId}`].rating} />
                                                        <div onClick={() => handleShow(`${product.productId}-${order.orderId}`)} style={{cursor:"pointer"}} className="me-3 text-center">
                                                        <EyeFill className="ms-2 me-0 pe-0 fs-5" style={{color:"#e39038b4"}}/>    
                                                        </div>
                                                        </div>
                                                        <Modal centered show={showModal[`${product.productId}-${order.orderId}`]} onHide={() => handleClose(`${product.productId}-${order.orderId}`)}>
                                                            <Modal.Header closeButton>
                                                            <Modal.Title>
                                                                <p className="fs-6 mb-0">
                                                                Recensito il {formatDate(review[`${product.productId}-${order.orderId}`].dateReview)}
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
                                                    <div className="a-b-o-h py-2 px-3 rounded-2" style={{cursor:"pointer"}}>
                                                        <p onClick={() => handleToggleModal(product.productId)} className="m-0 p-0">Scrivi una recensione</p>
                                                        {showModalReview[product.productId] &&
                                                         <Review orderId={order.orderId} productId={product.productId} shopId={product.shop.shopId} onClose={() => handleToggleModal(product.productId)}/>
                                                        }
                                                    </div>
                                                    }                                               
                                                    </p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        )
                                    })} 
                                    <Row className="mb-2">
                                        <Col className="d-flex align-items-center border-top mt-4 pt-2 pb-2">
                                        <Button variant="outline-dark" className="px-4 mt-2">Visualizza Ricevuta</Button>
                                        </Col>
                                        <Col className="d-flex justify-content-end border-top mt-4 pt-2">
                                            <p className="mt-3">Totale dell'ordine: <span className="fw-bold">{order.payment.total.toFixed(2)}€</span></p>                                              
                                        </Col>
                                    </Row>
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