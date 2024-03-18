import Checkmark from "./utils/Checkmark";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import PayPalCheckOut from "./utils/PayPalCheckout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, getProductInCartAction } from "../redux/actions";

function Cart(){
    const navigate = useNavigate();
    const [showPayPal, setShowPayPal] = useState(false);
    const [deleteProductSuccess, setDeleteProductSuccess] = useState(false);
    const [addProductSuccess, setAddProductSuccess] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    


    const dispatch = useDispatch()
    const productsInCart = useSelector((state) => state.cart.content)

    const handleOrderId = (orderId) => {
        // Gestisci l'orderId ricevuto dal componente figlio qui nel componente genitore
        console.log("Order ID ricevuto nel genitore:", orderId);
        // Passo l'orderId nel componente di Ordine Completato
        setTimeout(()=>{
            navigate(`/order/${orderId}`)
            window.location.reload()
        },3500)
    };

    const deleteProductInCart = (productId) =>{
        fetch(`http://localhost:3010/cart/${productId}/removeproduct`,{
            method: "DELETE",
            headers:{Authorization: localStorage.getItem("tokenAdmin")}
        })
        .then((res)=>{
            if(res.ok){
                console.log("Prodotto Eliminato" + res)
                setDeleteProductSuccess(!deleteProductSuccess)
            }else{
                throw new Error("Errore nell'eliminare il prodotto nel carrello")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    } 

    const addProductToCart = (productId) => {
        fetch(`http://localhost:3010/cart/${productId}/addproduct`,{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("tokenAdmin")
          },
        })
        .then((res)=>{
          if(res.ok){
            return res.json()
          }else{
            throw new Error("Errore nell'aggiungere il prodotto nel carrello")
          }
        })
        .then((data)=>{
          console.log("Carrello: ")
            console.log(data)
            setAddProductSuccess(!addProductSuccess)
        })
        .catch((err)=>{
          console.log(err)
        })
      }



  const calculateTotal = () => {
    return productsInCart.reduce((total, item) => total + item.price, 0);
  };
  
  
  useEffect(()=>{
    dispatch(getProductInCartAction())
}, [deleteProductSuccess, addProductSuccess])

    return(
        <Container>
            <Row className="d-flex flex-column flex-lg-row mt-5" >
{/* ----------------------------------------------------------------------------Prodotti carrello------------------------------------------------------------------ */}

                <Col  >
                    <Row className="d-flex flex-column ">
                            {Object.values(productsInCart.reduce((acc, product) => {
                                 // Raggruppa i prodotti per productId e conta le quantità
                                                if (acc[product.productId]) {
                                                    acc[product.productId].quantity += 1;
                                                } else {
                                                    acc[product.productId] = { ...product, quantity: 1 };
                                                }
                                                return acc;
                                            }, {}))
                        .map((product) => (
                            <Col className="p-3" key={product.productId}>
                                <Row className="shodow-p p-3 rounded-3">
                                    <Col  className="">
                                    <img src={product.photo1} alt="image-product" className="img-fluid rounded-2 my-3" style={{width:"250px", height:"250px", objectFit:"cover"}}/>
                                    </Col>
                                    <Col className="d-flex flex-column justify-content-center justify-content-between my-4">
                                        <div>
                                                <p className="fw-bold text-capitalize fs-5 m-0">{product.title}</p>
                                                <p className="fw-bold text-capitalize fs-2 text-art m-0"> {product.price ? product.price.toFixed(2) + " €" : ""}</p>
                                                <p>{product.productType === "PHYSICAL" ? "Consegna in 7 giorni" :
                                                    (product.productType === "DIGITAL") ? "Download istantaneo" : ""}</p>
                                        </div>
                                        <Row className="">
                                            <Col className="ms-3">
                                                    <Row>
                                                            <Col className="d-flex justify-content-center align-items-center p-0">
                                                                <Button variant="dark" className="rounded-circle p-0" style={{width:"40px", height:"40px"}}
                                                                onClick={() => { deleteProductInCart(product.productId) }}>-</Button>
                                                            </Col>
                                                            <Col className="d-flex justify-content-center align-items-center p-0">
                                                                <p className="fw-bold text-capitalize fs-3 m-2 p-0">{product.quantity}</p>
                                                            </Col>
                                                            <Col className="d-flex justify-content-center align-items-center p-0">
                                                                <Button className="artesum-color-button rounded-circle" style={{width:"40px", height:"40px"}}
                                                                onClick={() => {addProductToCart(product.productId)}}>+</Button>
                                                            </Col>
                                                    </Row>
                                            </Col>
                                            <Col></Col>
                                        </Row>
                                    </Col>
                                </Row>
                                </Col>
                                ))}
                        </Row>
                    </Col>
{/* ----------------------------------------------------------------------------DETTAGLI PAGAMENTO------------------------------------------------------------------ */}
                    <Col className="mt-5 mx-5 text-center">
                        <div>
                        <div className="d-flex justify-content-between">
                        <p>Totale articoli:</p>
                        <p>{calculateTotal().toFixed(2)} €</p>
                        {/* <p>{product.quantity * product.price} €</p> */}
                        </div>
                        <div className="d-flex justify-content-between  border-bottom">
                        <p>Sconto del negozio:</p>
                        <p>0%</p>
                        </div>
                        <div className="d-flex justify-content-between border-bottom mt-2">
                        <p>Subtotale</p>
                        <p>{calculateTotal().toFixed(2)} €</p>
                        {/* <p>{product.quantity * product.price} €</p> */}
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                        <p>Totale Iva Inclusa:</p>
                        <p className="fw-bold">{(calculateTotal() * 1.22).toFixed(2)}  €</p>
                        {/* <p> {(product.quantity * product.price * 1.22).toFixed(2)} €</p> */}
                        </div>
                        </div>
                        <Button variant="dark" className="px-5 py-2 fs-4 w-100 mt-3" onClick={()=>{setShowPayPal(true)}}>Procedi all'acquisto</Button>
                        {showPayPal &&
                        <PayPalCheckOut
                            cartItems={productsInCart}
                            total={calculateTotal()}
                            onClose={() => setShowPayPal(false)}
                            onSuccess={() => setShowSuccessMessage(true)} // Passa la funzione di callback
                            onOrderIdChange={handleOrderId} // Passa la funzione di callback come prop al componente PayPalCheckOut
                        />
                        }
                        {showSuccessMessage && (
                                            <div className="d-flex justify-content-center mt-3">
                                                <Checkmark/>
                                            </div>          
                            )}
                        <p className="mt-4 text-body-tertiary mt-4"> Imposte locali incluse (dove applicabili)</p>
                        <p className="text-body-tertiary"> È possibile che vengano applicati oneri e tasse aggiuntivi</p>
                    </Col> 
                        <div className='bg-dark'>
                    
                        </div>
                
            </Row>
        </Container>
    )
}
export default Cart