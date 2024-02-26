import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useEffect } from "react"
import { useState } from "react"

function PayPalCheckOut({ cartItems, total, onClose }){
    const [ErrorMessage, setErrorMessage] = useState('')
    const [orderID, setOrderID] = useState(false)
  
    // creates a paypal order
    const createOrder = (data, actions) => {
      return actions.order
        .create({
          purchase_units: [
            {
              description: 'Prodotti ordinati in Artesum',
              amount: {
                currency_code: 'USD',
                value: total,
              },
            },
          ],
          // not needed if a shipping address is actually needed
          application_context: {
            shipping_preference: 'NO_SHIPPING',
          },
        })
        .then((orderID) => {
          setOrderID(orderID)
          console.log(orderID)
          return orderID
        })
    }
  
    // check Approval
    const onApprove = (data, actions) => {
      // Effettua l'azione di approvazione, ad esempio, invia una richiesta al backend per confermare il pagamento
        console.log('Payment approved:', data);
        actions.order.capture().then((details) => {
        console.log('Payment details:', details);
        // Chiudi il componente o esegui altre azioni necessarie
        onClose();
        // Rimuovi i prodotti dal carrello
        deleteAllProductInCart();
    })
  }
    //capture likely error
    const onError = (data, actions) => {
      setErrorMessage('An Error occured with your payment ')
    }

    const deleteAllProductInCart = () =>{
      fetch(`http://localhost:3010/cart/removeAll`,{
          method: "DELETE",
          headers:{Authorization: localStorage.getItem("tokenAdmin")}
      })
      .then((res)=>{
          if(res.ok){
              console.log("Prodotto Eliminato" + res)
          }else{
              throw new Error("Errore nell'eliminare il prodotto nel carrello")
          }
      })
      .catch((err)=>{
          console.log(err)
      })
  }
  
  
    console.log(1, orderID)
    console.log(3, ErrorMessage)
    return(

        <PayPalScriptProvider options={{ 'client-id':'AU2xJD1zO-siaOvBf6yjgrCJtQDK4K38FFyiP9Y-46i26SsQuLh0clivJlMt6T6RsALLctweOvA5RsY-', }}>
            <PayPalButtons className="mt-4"
              style={{ layout: 'vertical' }} createOrder={createOrder} onApprove={onApprove} onError={onError}/> 
      </PayPalScriptProvider>
    )
}
export default PayPalCheckOut