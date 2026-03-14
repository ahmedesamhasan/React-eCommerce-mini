import { Link } from 'react-router-dom';

function ProductCard({
  product,
  t,
  isSaved,
  onAddToCart,
  onToggleWishlist,
}) {
  return (
    <article className='card h-100 border-0 shadow-sm product-card'>
      <div className='position-absolute top-0 end-0 p-3 d-flex gap-2 z-1'>
        <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
          {product.stock > 0 ? t.inStock : t.outOfStock}
        </span>
      </div>

      <img
        src={product.thumbnail}
        className='card-img-top product-image'
        alt={product.title}
      />

      <div className='card-body d-flex flex-column'>
        <div className='d-flex justify-content-between align-items-start gap-3 mb-2'>
          <div>
            <p className='text-muted text-capitalize small mb-1'>{product.category}</p>
            <h3 className='h5 mb-0 line-clamp-1'>{product.title}</h3>
          </div>
          <span className='badge bg-light text-dark border'>★ {product.rating}</span>
        </div>

        <p className='text-muted line-clamp-2 mb-3'>{product.description}</p>

        <div className='d-flex align-items-center justify-content-between mb-3'>
          <span className='fs-5 fw-bold text-primary'>${product.price}</span>
          <span className='small text-muted'>{product.brand || '-'}</span>
        </div>

        <div className='mt-auto d-grid gap-2'>
          <div className='d-grid gap-2 d-sm-flex'>
            <Link to={`/details/${product.id}`} className='btn btn-outline-dark flex-fill'>
              {t.viewDetails}
            </Link>
            <button
              type='button'
              className='btn btn-dark flex-fill'
              onClick={() => onAddToCart(product)}
              disabled={product.stock === 0}
            >
              {t.addToCart}
            </button>
          </div>

          <button
            type='button'
            className={`btn ${isSaved ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => onToggleWishlist(product)}
            aria-label={isSaved ? t.removeFromWishlist : t.saveToWishlist}
          >
            {isSaved ? t.removeFromWishlist : t.saveToWishlist}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
