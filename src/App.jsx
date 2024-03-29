import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Registrazione from './components/Registrazione'
import Homepage from './components/Homapage'
import ProductDetail from './components/ProductDetail'
import ShopDetail from './components/ShopDetail'
import CustomNavbar from './components/CustomNavbar'
import BecomeSeller from './components/BecomeSeller'
import Cart from './components/Cart'
import ShopUpdate from './components/ShopUpdate'
import UserUpdate from './components/UserUpdate'
import ProductByCategory from './components/ProductByCategory'
import ProductBySearch from './components/ProductBySearch'
import FooterArtesum from './components/FooterArtesum'
import OrderCompleted from './components/OrderCompleted'



function App() {

  return (
    
    <BrowserRouter >
    <div className="d-flex flex-column " style={{minHeight:"100vh"}} >
    <CustomNavbar/>
    <div className="flex-grow-1 mb-5">
    <Routes>
      <Route path='/registrazione' element={<Registrazione/>}/>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/product/:productId' element={<ProductDetail/>}/>
      <Route path='/category/:categoryId' element={<ProductByCategory/>}/>
      <Route path='/order/:orderId' element={<OrderCompleted/>}/>
      <Route path='/searchwith' element={<ProductBySearch/>}/>
      <Route path="/shop/:shopId" element={<ShopDetail/>}/>
      <Route path="/becomeseller" element={<BecomeSeller/>}/>
      <Route path="/updateshop" element={<ShopUpdate/>}/>
      <Route path="/updateuser" element={<UserUpdate/>}/>
      <Route path="/cart" element={<Cart/>}/>
    </Routes>
    </div>
    <FooterArtesum/>
    </div>
    </BrowserRouter>
    
  )
}

export default App

