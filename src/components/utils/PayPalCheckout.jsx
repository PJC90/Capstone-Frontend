import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { Button } from "bootstrap"
import { useEffect } from "react"
import { useState } from "react"

function PayPalCheckOut(){
    const [show, setShow] = useState(false)
    const [success, setSuccess] = useState(false)
    const [ErrorMessage, setErrorMessage] = useState('')
    const [orderID, setOrderID] = useState(false)
  
    // creates a paypal order
    const createOrder = (data, actions) => {
      return actions.order
        .create({
          purchase_units: [
            {
              description: 'Sunflower',
              amount: {
                currency_code: 'USD',
                value: 20,
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
      return actions.order.capture().then(function (details) {
        const { payer } = details
        setSuccess(true)
      })
    }
    //capture likely error
    const onError = (data, actions) => {
      setErrorMessage('An Error occured with your payment ')
    }
    useEffect(() => {
      if (success) {
        alert('Payment successful!!')
      }
    }, [success])
  
    console.log(1, orderID)
    console.log(2, success)
    console.log(3, ErrorMessage)
    console.log(4, show)
    return(
        <PayPalScriptProvider
        options={{
          'client-id':
            'AU2xJD1zO-siaOvBf6yjgrCJtQDK4K38FFyiP9Y-46i26SsQuLh0clivJlMt6T6RsALLctweOvA5RsY-',
        }}
      >
        <Button type="submit" onClick={() => setShow(true)}>
                Buy now
              </Button>
  
          {show ? (
            <PayPalButtons
              style={{ layout: 'vertical' }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
          ) : null}
        
      </PayPalScriptProvider>
    )
}
export default PayPalCheckOut