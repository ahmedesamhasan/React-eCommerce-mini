import { Link } from 'react-router-dom';
import useLanguage from '../hooks/useLanguage';

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className='border-top bg-white mt-5'>
      <div className='container py-4'>
        <div className='row g-4 align-items-center'>
          <div className='col-lg-6'>
            <h2 className='h5 mb-2'>{t.brand}</h2>
            <p className='text-muted mb-0'>{t.footerText}</p>
          </div>

          <div className='col-lg-6'>
            <div className='d-flex flex-wrap gap-3 justify-content-lg-end'>
              <Link to='/' className='footer-link'>
                {t.products}
              </Link>
              <Link to='/wishlist' className='footer-link'>
                {t.wishlist}
              </Link>
              <Link to='/cart' className='footer-link'>
                {t.cart}
              </Link>
              <Link to='/login' className='footer-link'>
                {t.login}
              </Link>
              <Link to='/contact' className='footer-link'>
                {t.needHelp}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
