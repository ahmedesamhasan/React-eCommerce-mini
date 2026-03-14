import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import useLanguage from '../hooks/useLanguage';
import useToast from '../hooks/useToast';
import { fetchProductById } from '../services/productService';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadProduct = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const data = await fetchProductById(id);
      setProduct(data);
      setSelectedImage(data.thumbnail);
    } catch {
      setErrorMessage(t.failedProducts);
    } finally {
      setIsLoading(false);
    }
  }, [id, t.failedProducts]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const isSaved = useMemo(
    () => wishlistItems.some((item) => item.id === Number(id)),
    [id, wishlistItems],
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    showToast(t.addedToCart, 'success');
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
    showToast(isSaved ? t.wishlistRemoved : t.wishlistSaved, 'danger');
  };

  if (isLoading) {
    return <LoadingState message={t.loadingProducts} />;
  }

  if (errorMessage || !product) {
    return <ErrorState message={errorMessage || t.failedProducts} actionLabel={t.retry} onRetry={loadProduct} />;
  }

  return (
    <section className='py-4'>
      <Link to='/' className='btn btn-outline-secondary mb-4'>
        {t.backToProducts}
      </Link>

      <div className='card border-0 shadow-sm overflow-hidden details-card'>
        <div className='row g-0'>
          <div className='col-lg-6 p-4 p-lg-5 details-gallery-panel'>
            <img
              src={selectedImage || product.thumbnail}
              alt={product.title}
              className='img-fluid rounded w-100 details-main-image'
            />

            <div className='d-flex flex-wrap gap-2 mt-3'>
              {product.images?.map((imageUrl) => (
                <button
                  key={imageUrl}
                  type='button'
                  className={`image-thumb-button ${selectedImage === imageUrl ? 'active' : ''}`}
                  onClick={() => setSelectedImage(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    width='80'
                    height='80'
                    className='rounded border bg-white p-1'
                    style={{ objectFit: 'contain' }}
                    alt={product.title}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className='col-lg-6 p-4 p-lg-5'>
            <p className='text-uppercase text-muted mb-2'>{product.category}</p>
            <h1 className='display-6 fw-bold'>{product.title}</h1>
            <p className='text-muted mb-4'>
              {t.brandLabel}: {product.brand || '-'}
            </p>

            <div className='d-flex flex-wrap gap-3 mb-4'>
              <span className='badge bg-warning text-dark px-3 py-2'>
                {t.rating}: {product.rating}
              </span>
              <span
                className={`badge px-3 py-2 ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}
              >
                {t.stock}: {product.stock}
              </span>
            </div>

            <h2 className='text-primary mb-3'>${product.price}</h2>
            <p className='lead text-secondary'>{product.description}</p>

            <div className='info-grid mb-4'>
              <div className='info-box'>
                <span className='text-muted small d-block'>{t.brandLabel}</span>
                <strong>{product.brand || '-'}</strong>
              </div>
              <div className='info-box'>
                <span className='text-muted small d-block'>{t.category}</span>
                <strong>{product.category}</strong>
              </div>
              <div className='info-box'>
                <span className='text-muted small d-block'>{t.rating}</span>
                <strong>{product.rating}</strong>
              </div>
              <div className='info-box'>
                <span className='text-muted small d-block'>{t.stock}</span>
                <strong>{product.stock}</strong>
              </div>
            </div>

            <div className='d-grid gap-3 mt-4'>
              <div className='d-grid d-sm-flex gap-3'>
                <button type='button' className='btn btn-dark btn-lg px-4'>
                  {t.buyNow}
                </button>
                <button
                  type='button'
                  className='btn btn-outline-primary btn-lg px-4'
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {t.addToCart}
                </button>
              </div>

              <button
                type='button'
                className={`btn btn-lg ${isSaved ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={handleToggleWishlist}
              >
                {isSaved ? t.removeFromWishlist : t.saveToWishlist}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
