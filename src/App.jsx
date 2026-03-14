import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import ContactUs from './pages/ContactUs';
import MyNavbar from './pages/MyNavbar';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className='page-shell'>
        <MyNavbar />

        <main className='app-shell'>
          <div className='container py-4'>
            <Routes>
              <Route path='/' element={<Products />} />
              <Route path='/details/:id' element={<ProductDetails />} />
              <Route path='/wishlist' element={<Wishlist />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/contact' element={<ContactUs />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
