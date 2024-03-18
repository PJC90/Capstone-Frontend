import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css/animate.min.css';
import store from './redux/store'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
  </Provider>,
)
