import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart, updateQuantity } from '../store/cartSlice';
import useLanguage from '../hooks/useLanguage';
import useToast from '../hooks/useToast';
import EmptyState from '../components/ui/EmptyState';
import SectionHeader from '../components/ui/SectionHeader';

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleClearCart = () => {
    dispatch(clearCart());
    showToast(t.cartUpdated, 'dark');
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
    showToast(t.cartUpdated, 'dark');
  };

  const handleQuantityChange = (itemId, amount) => {
    dispatch(updateQuantity({ id: itemId, amount }));
    showToast(t.cartUpdated, 'dark');
  };

  if (cartItems.length === 0) {
    return (
      <EmptyState
        title={t.yourCartIsEmpty}
        description={t.goAddSomeProducts}
        action={
          <Link to='/' className='btn btn-primary'>
            {t.continueShopping}
          </Link>
        }
      />
    );
  }

  return (
    <section className='py-4'>
      <SectionHeader
        title={`${t.shoppingCart} (${totalItems} ${totalItems === 1 ? t.item : t.items})`}
        action={
          <button type='button' className='btn btn-outline-danger' onClick={handleClearCart}>
            {t.clearCart}
          </button>
        }
      />

      <div className='row g-4'>
        <div className='col-lg-8'>
          {cartItems.map((item) => (
            <article key={item.id} className='card mb-3 shadow-sm border-0'>
              <div className='row g-0 align-items-center'>
                <div className='col-md-3 text-center p-3'>
                  <img
                    src={item.thumbnail}
                    className='img-fluid'
                    alt={item.title}
                    style={{ maxHeight: '150px', objectFit: 'contain' }}
                  />
                </div>

                <div className='col-md-9'>
                  <div className='card-body'>
                    <div className='d-flex flex-column flex-sm-row justify-content-between gap-3'>
                      <div>
                        <h2 className='h5 mb-2'>{item.title}</h2>
                        <p className='text-primary fw-bold mb-2'>${item.price}</p>
                        <p className='text-muted small mb-0'>
                          {t.quantity}: {item.quantity}
                        </p>
                      </div>

                      <button
                        type='button'
                        className='btn btn-outline-danger btn-sm align-self-start'
                        onClick={() => handleRemove(item.id)}
                      >
                        {t.remove}
                      </button>
                    </div>

                    <div className='d-flex align-items-center gap-2 mt-3'>
                      <button
                        type='button'
                        className='btn btn-light btn-sm border'
                        onClick={() => handleQuantityChange(item.id, -1)}
                        aria-label={`Decrease ${item.title} quantity`}
                      >
                        -
                      </button>

                      <span className='fw-semibold'>{item.quantity}</span>

                      <button
                        type='button'
                        className='btn btn-light btn-sm border'
                        onClick={() => handleQuantityChange(item.id, 1)}
                        aria-label={`Increase ${item.title} quantity`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className='col-lg-4'>
          <div className='card shadow-sm border-0 p-4'>
            <h2 className='h4 mb-4'>{t.orderSummary}</h2>
            <div className='d-flex justify-content-between mb-2'>
              <span>{t.subtotal}</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className='d-flex justify-content-between mb-2 text-muted'>
              <span>{t.shipping}</span>
              <span>{t.free}</span>
            </div>
            <hr />
            <div className='d-flex justify-content-between mb-2 fw-bold fs-5'>
              <span>{t.total}</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <p className='text-muted small mb-4'>{t.summaryNote}</p>
            <button type='button' className='btn btn-dark w-100 btn-lg mb-2'>
              {t.checkout}
            </button>
            <Link to='/' className='btn btn-outline-secondary w-100'>
              {t.continueShopping}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
