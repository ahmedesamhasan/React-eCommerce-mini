import { Link } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';
import useLanguage from '../hooks/useLanguage';

function NotFound() {
  const { t } = useLanguage();

  return (
    <EmptyState
      title={t.pageNotFound}
      description={t.browseCollection}
      action={
        <Link to='/' className='btn btn-primary'>
          {t.goHome}
        </Link>
      }
    />
  );
}

export default NotFound;
