import { ADD_TO_CART, GET_CART } from '../actions'

const initialState = {
  content: [],
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        content: [...state.content, action.payload],
      }
    case GET_CART:
      return {
        ...state,
        content: action.payload,
      }

    default:
      return state
  }
}

export default cartReducer
