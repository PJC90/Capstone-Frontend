import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Registrazione from './components/Registrazione'
import Homepage from './components/Homapage'
import ProductDetail from './components/ProductDetail'
import Shop from './components/Shop'
import ShopDetail from './components/ShopDetail'



function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/registrazione' element={<Registrazione/>}/>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/product/:productId' element={<ProductDetail/>}/>
      <Route path="/shop/:shopId" element={<ShopDetail/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
