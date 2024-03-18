export const ADD_TO_CART = 'ADD_TO_CART'
export const GET_CART = 'GET_CART'

export const addToCartAction = (productId) => {
  return (dispatch) => {
    fetch(`http://localhost:3010/cart/${productId}/addproduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('tokenAdmin'),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error("Errore nell'aggiungere il prodotto nel carrello")
        }
      })
      .then((product) => {
        console.log(product)
        dispatch({
          type: ADD_TO_CART,
          payload: product,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const getProductInCartAction = () => {
  return (dispatch) => {
    fetch('http://localhost:3010/cart/productInCart', {
      headers: { Authorization: localStorage.getItem('tokenAdmin') },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Errore nel recupero del tuo carrello')
        }
      })
      .then((cart) => {
        dispatch({
          type: GET_CART,
          payload: cart,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
