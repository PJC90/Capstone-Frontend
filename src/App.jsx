import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Registrazione from './components/Registrazione'
import Homepage from './components/Homapage'



function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/registrazione' element={<Registrazione/>}/>
      <Route path='/' element={<Homepage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
