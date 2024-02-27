import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useState } from "react"

function PayPalCheckOut({ cartItems, total, onClose, onSuccess, onOrderIdChange  }){
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
          console.log("orderID paypal:")
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
         // Salva Il pagamento solo dopo che il pagamento è stato confermato con successo
         savePayment(data.orderID);
         // Chiamare la funzione di callback per indicare che il pagamento è andato a buon fine
         onSuccess();
    })
  }
    //capture likely error
    const onError = (data, actions) => {
      setErrorMessage('An Error occured with your payment ')
    }

    // il Backend si occupa di eliminare i prodotti nel carrello e di trasferire la lista dei prodotti acquistati nell'ordine

  const PaymentDTO = {
    // transactionCode lo passo nella funzione per assicurarmi che non sia false
    paymentType: "PAYPAL"
  }

  const savePayment = (orderID) => {
    PaymentDTO.transactionCode = orderID
    fetch("http://localhost:3010/payment", {
      method:"POST",
      headers: {
      Authorization: localStorage.getItem("tokenAdmin"), 
      "Content-Type": "application/json"
      },
      body: JSON.stringify(PaymentDTO)
    })
    .then((res)=>{
      if(res.ok){
        return res.json()
      }else{
        throw new Error("Errore nel salvare il pagamento")
      }
    })
    .then((data)=>{
      console.log("Pagamento Salvato:")
      console.log(data)
      saveOrder(data.paymentId)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const saveOrder = (paymentId) => {
    fetch(`http://localhost:3010/order/${paymentId}`,{
      method:"POST",
      headers:{
        Authorization:localStorage.getItem("tokenAdmin"),
        "Content-Type": "application/json"
      }
    })
    .then((res)=>{
      if(res.ok){
        return res.json()
      }else{
        throw new Error("Errore nel salvare l'ordine")
      }
    })
    .then((data)=>{
      console.log("Ordine salvato:")
      console.log(data)
      // Passa l'orderId al genitore utilizzando la funzione di callback
      // controllo che onOrderIdChange sia una funzione prima di chiamarla per evitare errori.
      if (typeof onOrderIdChange  === 'function') {
        onOrderIdChange(data.orderId);
    }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

    console.log(1, orderID)
    console.log(3, ErrorMessage)
    return(
      
        <PayPalScriptProvider options={{ 'client-id': paypalClientId, }}>
            <PayPalButtons className="mt-4"
              style={{ layout: 'vertical' }} createOrder={createOrder} onApprove={onApprove} onError={onError}/> 
      </PayPalScriptProvider>
    )
}
export default PayPalCheckOut