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
import ShopUpdateDetail from './components/ShopUpdateDetail'



function App() {

  return (
    <>
    <BrowserRouter>
    <CustomNavbar/>
    <Routes>
      <Route path='/registrazione' element={<Registrazione/>}/>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/product/:productId' element={<ProductDetail/>}/>
      <Route path="/shop/:shopId" element={<ShopDetail/>}/>
      <Route path="/becomeseller" element={<BecomeSeller/>}/>
      <Route path="/updateshop" element={<ShopUpdate/>}/>
      <Route path="/cart" element={<Cart/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

// Le impostazioni della privacy di Etsy
// Per offrirti la migliore esperienza, utilizziamo i cookie e altre tecnologie simili per le prestazioni, i dati statistici, 
// la personalizzazione, la pubblicità e per coadiuvare la funzione del sito. 
// Desideri maggiori informazioni? Leggi il nostro Regolamento sui cookie. 
// Puoi modificare le tue preferenze in qualsiasi momento nelle Impostazioni della privacy.
