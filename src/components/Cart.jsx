import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import PayPalCheckOut from "./utils/PayPalCheckout";

function Cart(){

    const[productsInCart, setProductsInCart] = useState([])
    const [showDelete, setshowDelete] = useState(false)
    const [showPayPal, setShowPayPal] = useState(false);

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
                setshowDelete(true)
                setTimeout(()=>{
                    setshowDelete(false)
                    window.location.reload()
                },1000)
            }else{
                throw new Error("Errore nell'eliminare il prodotto nel carrello")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

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
            <Row className="d-flex flex-row mt-5" 
            // style={{height:"100vh"}} //per il footer
            >
                <Col xs={7} >
                    <Row className="d-flex flex-column border border-black rounded-5">
        {Object.values(groupedProducts).map((product) => (
                            <Col className="" key={product.productId}>
                                <Row className="border-black border-bottom">
                                    <Col xs={2} md={6} className="">
                                    <img src={product.photo1} alt="image-product" className="img-fluid border rounded-5 my-3" />
                                    </Col>
                                    <Col className="d-flex flex-column justify-content-center justify-content-evenly my-5">
                                    <p>Prodotto: <span className="fw-bold text-capitalize fs-5 ms-2"> {product.title}</span></p>
                                    <p>{product.productType === "PHYSICAL" ? "Consegna in 7 giorni" :
                                        (product.productType === "DIGITAL") ? "Download istantaneo" : ""}</p>
                                    <p>Prezzo: <span className="fw-bold text-capitalize fs-3 ms-2"> {product.price} €</span></p>
                                    <p>Quantità: <span className="fw-bold text-capitalize fs-3 ms-2">{product.quantity}</span></p>
                                    <Button className="bg-black d-block w-50 border-0" onClick={() => { deleteProductInCart(product.productId) }}>Rimuovi</Button>
                                    </Col>
                                </Row>
                                </Col>
                                ))}
                        </Row>
                    </Col>
                    <Col className="mt-5 mx-5 text-center">
                        <div className="mx-4">
                        <div className="d-flex justify-content-between">
                        <p>Totale articoli:</p>
                        <p>111 €</p>
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
                        <p>{calculateTotal() * 1.22}  €</p>
                        {/* <p> {(product.quantity * product.price * 1.22).toFixed(2)} €</p> */}
                        </div>
                        </div>
                        <Button className="bg-dark px-5 rounded-pill border-0 mt-3" onClick={()=>{setShowPayPal(true)}}>Procedi all'acquisto</Button>
                        {showPayPal &&
                        <PayPalCheckOut
                            cartItems={productsInCart}
                            total={calculateTotal()}
                            onClose={() => setShowPayPal(false)}
                        />
                        }
                        <p className="mt-4 text-body-tertiary mt-4"> Imposte locali incluse (dove applicabili)</p>
                        <p className="text-body-tertiary"> È possibile che vengano applicati oneri e tasse aggiuntivi</p>
                        {showDelete && <Alert>Prodotto Eliminato</Alert>}  
                    </Col> 
                        
                
            </Row>
        </Container>
    )
}
export default Cart