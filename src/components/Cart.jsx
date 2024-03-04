import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import PayPalCheckOut from "./utils/PayPalCheckout";
import { useNavigate } from "react-router-dom";

function Cart(){
    const navigate = useNavigate();
    const[productsInCart, setProductsInCart] = useState([])
    const [showPayPal, setShowPayPal] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const getAllProductInCart = () => {
        fetch("http://localhost:3010/cart/productInCart",{
            headers:{Authorization:localStorage.getItem("tokenAdmin")}
        })
        .then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error("Errore nel ricevere i prodotti del tuo carrello")
            }
        })
        .then((data)=>{
            setProductsInCart(data)
            console.log("Prdotti nel carrello:")
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const deleteProductInCart = (productId) =>{
        fetch(`http://localhost:3010/cart/${productId}/removeproduct`,{
            method: "DELETE",
            headers:{Authorization: localStorage.getItem("tokenAdmin")}
        })
        .then((res)=>{
            if(res.ok){
                console.log("Prodotto Eliminato" + res)
                    window.location.reload()
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
            window.location.reload()
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    const handleOrderId = (orderId) => {
        // Gestisci l'orderId ricevuto dal componente figlio qui nel componente genitore
        console.log("Order ID ricevuto nel genitore:", orderId);
        // Passo l'orderId nel componente di Ordine Completato
        setTimeout(()=>{
            navigate(`/order/${orderId}`)
        },1900)
    };

    useEffect(()=>{
        getAllProductInCart()
    }, [])


    // Raggruppa i prodotti per productId e conta le quantità
const groupedProducts = productsInCart.reduce((acc, product) => {
    if (acc[product.productId]) {
      acc[product.productId].quantity += 1; // Incrementa la quantità
    } else {
      acc[product.productId] = { ...product, quantity: 1 }; // Crea un nuovo oggetto con la quantità iniziale 1
    }
    return acc;
  }, {});

  const calculateTotal = () => {
    return productsInCart.reduce((total, item) => total + item.price, 0);
  };
  
    return(
        <Container>
            <Row className="d-flex flex-column flex-lg-row mt-5" >
{/* ----------------------------------------------------------------------------Prodotti carrello------------------------------------------------------------------ */}

                <Col  >
                    <Row className="d-flex flex-column ">
        {Object.values(groupedProducts).map((product) => (
                            <Col className="p-3" key={product.productId}>
                                <Row className="shodow-p p-3 rounded-3">
                                    <Col  className="">
                                    <img src={product.photo1} alt="image-product" className="img-fluid rounded-2 my-3" style={{width:"250px", height:"250px", objectFit:"cover"}}/>
                                    </Col>
                                    <Col className="d-flex flex-column justify-content-center justify-content-between my-4">
                                        <div>
                                                <p className="fw-bold text-capitalize fs-5 m-0">{product.title}</p>
                                                <p className="fw-bold text-capitalize fs-2 text-art m-0"> {product.price} €</p>
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
                                                                onClick={() => { addProductToCart(product.productId) }}>+</Button>
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
                        <div className="mx-4">
                        <div className="d-flex justify-content-between">
                        <p>Totale articoli:</p>
                        <p>{calculateTotal()} €</p>
                        {/* <p>{product.quantity * product.price} €</p> */}
                        </div>
                        <div className="d-flex justify-content-between  border-bottom">
                        <p>Sconto del negozio:</p>
                        <p>0%</p>
                        </div>
                        <div className="d-flex justify-content-between border-bottom mt-2">
                        <p>Subtotale</p>
                        <p>{calculateTotal()} €</p>
                        {/* <p>{product.quantity * product.price} €</p> */}
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                        <p>Totale Iva Inclusa:</p>
                        <p>{(calculateTotal() * 1.22).toFixed(2)}  €</p>
                        {/* <p> {(product.quantity * product.price * 1.22).toFixed(2)} €</p> */}
                        </div>
                        </div>
                        <Button className="bg-dark px-5 rounded-pill border-0 mt-3" onClick={()=>{setShowPayPal(true)}}>Procedi all'acquisto</Button>
                        {showPayPal &&
                        <PayPalCheckOut
                            cartItems={productsInCart}
                            total={calculateTotal()}
                            onClose={() => setShowPayPal(false)}
                            onSuccess={() => setShowSuccessMessage(true)} // Passa la funzione di callback
                            onOrderIdChange={handleOrderId} // Passa la funzione di callback come prop al componente PayPalCheckOut
                        />
                        }
                        <p className="mt-4 text-body-tertiary mt-4"> Imposte locali incluse (dove applicabili)</p>
                        <p className="text-body-tertiary"> È possibile che vengano applicati oneri e tasse aggiuntivi</p>
                        {showSuccessMessage && (
                                <Alert variant="success">Pagamento completato con successo!</Alert>
                            )}
                    </Col> 
                        
                
            </Row>
        </Container>
    )
}
export default Cart