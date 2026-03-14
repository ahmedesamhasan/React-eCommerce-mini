import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import useLanguage from '../hooks/useLanguage';
import useToast from '../hooks/useToast';
import { fetchProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import PageIntro from '../components/ui/PageIntro';
import SectionHeader from '../components/ui/SectionHeader';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import PaginationControls from '../components/ui/PaginationControls';

const itemsPerPage = 10;

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortType, setSortType] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const { t } = useLanguage();
  const { showToast } = useToast();

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const skip = (currentPage - 1) * itemsPerPage;
      const data = await fetchProducts({ limit: itemsPerPage, skip });

      setProducts(data.products || []);
      setTotalPages(Math.ceil((data.total || 0) / itemsPerPage));
    } catch {
      setErrorMessage(t.failedProducts);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, t.failedProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((product) => product.category))];
    return ['all', ...uniqueCategories];
  }, [products]);

  const visibleProducts = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    const filteredProducts = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(normalizedSearch);
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    const sortedProducts = [...filteredProducts];

    if (sortType === 'price-low') {
      sortedProducts.sort((firstItem, secondItem) => firstItem.price - secondItem.price);
    }

    if (sortType === 'price-high') {
      sortedProducts.sort((firstItem, secondItem) => secondItem.price - firstItem.price);
    }

    if (sortType === 'rating') {
      sortedProducts.sort((firstItem, secondItem) => secondItem.rating - firstItem.rating);
    }

    return sortedProducts;
  }, [products, searchText, selectedCategory, sortType]);

  const stats = useMemo(() => {
    const totalVisibleItems = visibleProducts.length;
    const averageRating =
      totalVisibleItems > 0
        ? (
            visibleProducts.reduce((total, product) => total + product.rating, 0) /
            totalVisibleItems
          ).toFixed(1)
        : '0.0';

    return {
      totalVisibleItems,
      averageRating,
      cartCount: cartItems.reduce((total, item) => total + item.quantity, 0),
      wishlistCount: wishlistItems.length,
    };
  }, [cartItems, visibleProducts, wishlistItems]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    showToast(t.addedToCart, 'success');
  };

  const handleToggleWishlist = (product) => {
    const isSaved = wishlistItems.some((item) => item.id === product.id);
    dispatch(toggleWishlist(product));
    showToast(isSaved ? t.wishlistRemoved : t.wishlistSaved, 'danger');
  };

  return (
    <section className='py-3'>
      <PageIntro
        eyebrow={t.heroBadge}
        title={t.heroTitle}
        description={t.heroDescription}
        actions={[
          <a href='#products-grid' className='btn btn-dark btn-lg' key='shop'>
            {t.shopNow}
          </a>,
          <Link to='/cart' className='btn btn-outline-dark btn-lg' key='cart'>
            {t.viewCart}
          </Link>,
          <Link to='/wishlist' className='btn btn-outline-danger btn-lg' key='wishlist'>
            {t.wishlist}
          </Link>,
        ]}
      />

      <div className='row g-3 mb-4'>
        {[t.fastDelivery, t.secureCheckout, t.customerSupport].map((feature) => (
          <div className='col-md-4' key={feature}>
            <div className='feature-card h-100'>
              <p className='mb-0 fw-semibold'>{feature}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='row g-3 mb-4'>
        <div className='col-lg-3 col-sm-6'>
          <div className='stat-card'>
            <span className='text-muted small'>{t.results}</span>
            <strong className='d-block fs-3'>{stats.totalVisibleItems}</strong>
          </div>
        </div>
        <div className='col-lg-3 col-sm-6'>
          <div className='stat-card'>
            <span className='text-muted small'>{t.avgRating}</span>
            <strong className='d-block fs-3'>{stats.averageRating}</strong>
          </div>
        </div>
        <div className='col-lg-3 col-sm-6'>
          <div className='stat-card'>
            <span className='text-muted small'>{t.cartCount}</span>
            <strong className='d-block fs-3'>{stats.cartCount}</strong>
          </div>
        </div>
        <div className='col-lg-3 col-sm-6'>
          <div className='stat-card'>
            <span className='text-muted small'>{t.wishlistCount}</span>
            <strong className='d-block fs-3'>{stats.wishlistCount}</strong>
          </div>
        </div>
      </div>

      <SectionHeader
        title={t.ourProducts}
        description={`${t.page} ${currentPage} ${t.of} ${totalPages || 1}`}
        action={
          <div className='search-box'>
            <input
              type='search'
              className='form-control'
              placeholder={t.searchPlaceholder}
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              aria-label={t.searchPlaceholder}
            />
          </div>
        }
      />

      <div className='toolbar-card mb-4'>
        <div className='row g-3 align-items-end'>
          <div className='col-lg-8'>
            <label className='form-label fw-semibold'>{t.filters}</label>
            <div className='d-flex flex-wrap gap-2'>
              {categories.map((category) => {
                const label = category === 'all' ? t.allCategories : category;
                const isActive = selectedCategory === category;

                return (
                  <button
                    type='button'
                    key={category}
                    className={`btn btn-sm ${isActive ? 'btn-dark' : 'btn-outline-secondary'}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className='col-lg-4'>
            <label htmlFor='sortProducts' className='form-label fw-semibold'>
              {t.sortBy}
            </label>
            <select
              id='sortProducts'
              className='form-select'
              value={sortType}
              onChange={(event) => setSortType(event.target.value)}
            >
              <option value='default'>{t.defaultSort}</option>
              <option value='price-low'>{t.sortPriceLow}</option>
              <option value='price-high'>{t.sortPriceHigh}</option>
              <option value='rating'>{t.sortRating}</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading && <LoadingState message={t.loadingProducts} />}
      {errorMessage && (
        <ErrorState message={errorMessage} actionLabel={t.retry} onRetry={loadProducts} />
      )}

      {!isLoading && !errorMessage && visibleProducts.length === 0 && (
        <EmptyState title={t.emptyStateTitle} description={t.noProducts} />
      )}

      <div className='row g-4' id='products-grid'>
        {visibleProducts.map((product) => (
          <div className='col-md-6 col-lg-4 col-xl-3' key={product.id}>
            <ProductCard
              product={product}
              t={t}
              isSaved={wishlistItems.some((item) => item.id === product.id)}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
            />
          </div>
        ))}
      </div>

      {!isLoading && !errorMessage && totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          previousLabel={t.previous}
          nextLabel={t.next}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
}

export default Products;
