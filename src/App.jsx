import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/navbarfiles/Navbar'
import Footer from './components/footerfiles/Footer'
import Home from './components/Pages/Home'
import About from './components/Pages/About'
import Service from './components/Pages/Service'
import Contact from './components/Pages/Contact'
import Signup from './components/Pages/Signup'
import Login from './components/Pages/Login'
import Cart from './components/Pages/Cart'
import Notfound from './components/pages/Notfound'
import { BsCart4 } from 'react-icons/bs';


function App() {

  return (
    <>

      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/service' element={<Service/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='cart' element={<Cart/>}/>
          <Route path='*' element={<Notfound/>}/>
        </Routes>

        <Footer/>
      </Router>
      
    </>
  )
}

export default App
