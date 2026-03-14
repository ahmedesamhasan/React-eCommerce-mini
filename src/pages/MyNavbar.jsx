import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useLanguage from '../hooks/useLanguage';

function MyNavbar() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm'>
      <div className='container'>
        <Link className='navbar-brand fw-semibold d-flex flex-column' to='/'>
          <span>{t.brand}</span>
          <small className='brand-subtitle'>{t.discoverNow}</small>
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto align-items-lg-center gap-lg-2'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/'>
                {t.products}
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link position-relative' to='/wishlist'>
                {t.wishlist}
                {wishlistItems.length > 0 && (
                  <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                    {wishlistItems.length}
                  </span>
                )}
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/login'>
                {t.login}
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/register'>
                {t.register}
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/contact'>
                {t.contact}
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link position-relative cart-link' to='/cart'>
                {t.cart}
                {totalItems > 0 && (
                  <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                    {totalItems}
                  </span>
                )}
              </NavLink>
            </li>
            <li className='nav-item'>
              <button
                type='button'
                className='btn btn-outline-light btn-sm fw-semibold mt-2 mt-lg-0'
                onClick={toggleLanguage}
                aria-label='Switch language'
              >
                {language === 'en' ? 'AR' : 'EN'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MyNavbar;
