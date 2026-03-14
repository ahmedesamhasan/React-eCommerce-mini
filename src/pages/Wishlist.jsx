import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { clearWishlist, toggleWishlist } from '../store/wishlistSlice';
import useLanguage from '../hooks/useLanguage';
import useToast from '../hooks/useToast';
import PageIntro from '../components/ui/PageIntro';
import EmptyState from '../components/ui/EmptyState';

function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const handleMoveToCart = (product) => {
    dispatch(addToCart(product));
    showToast(t.addedToCart, 'success');
  };

  const handleRemove = (product) => {
    dispatch(toggleWishlist(product));
    showToast(t.wishlistRemoved, 'danger');
  };

  if (wishlistItems.length === 0) {
    return (
      <EmptyState
        title={t.wishlistTitle}
        description={t.emptyWishlist}
        action={
          <Link to='/' className='btn btn-dark'>
            {t.continueShopping}
          </Link>
        }
      />
    );
  }

  return (
    <section className='py-4'>
      <PageIntro eyebrow={t.wishlistEyebrow} title={t.wishlistTitle} description={t.wishlistIntro} />

      <div className='d-flex justify-content-end mb-3'>
        <button
          type='button'
          className='btn btn-outline-danger'
          onClick={() => dispatch(clearWishlist())}
        >
          {t.clearWishlist}
        </button>
      </div>

      <div className='row g-4'>
        {wishlistItems.map((item) => (
          <div className='col-md-6 col-xl-4' key={item.id}>
            <article className='card border-0 shadow-sm h-100'>
              <img src={item.thumbnail} alt={item.title} className='product-image border-bottom' />
              <div className='card-body d-flex flex-column'>
                <p className='text-muted text-capitalize small mb-1'>{item.category}</p>
                <h2 className='h5'>{item.title}</h2>
                <p className='text-muted line-clamp-2'>{item.description}</p>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                  <strong className='text-primary fs-5'>${item.price}</strong>
                  <span className='badge bg-light text-dark border'>★ {item.rating}</span>
                </div>
                <div className='d-grid gap-2 mt-auto'>
                  <button
                    type='button'
                    className='btn btn-dark'
                    onClick={() => handleMoveToCart(item)}
                  >
                    {t.moveToCart}
                  </button>
                  <button
                    type='button'
                    className='btn btn-outline-danger'
                    onClick={() => handleRemove(item)}
                  >
                    {t.removeFromWishlist}
                  </button>
                  <Link to={`/details/${item.id}`} className='btn btn-outline-secondary'>
                    {t.viewDetails}
                  </Link>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Wishlist;
