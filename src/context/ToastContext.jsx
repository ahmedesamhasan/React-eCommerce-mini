import { useCallback, useMemo, useState } from 'react';
import { ToastContext } from './toastConfig';

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((toastId) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== toastId));
  }, []);

  const showToast = useCallback((message, tone = 'dark') => {
    const toastId = Date.now() + Math.random();

    setToasts((currentToasts) => [...currentToasts, { id: toastId, message, tone }]);

    window.setTimeout(() => {
      removeToast(toastId);
    }, 2400);
  }, [removeToast]);

  const value = useMemo(
    () => ({ showToast, removeToast }),
    [showToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className='toast-stack' aria-live='polite' aria-atomic='true'>
        {toasts.map((toast) => (
          <div key={toast.id} className={`app-toast app-toast-${toast.tone}`} role='status'>
            <span>{toast.message}</span>
            <button
              type='button'
              className='btn-close btn-close-white ms-3'
              aria-label='Close notification'
              onClick={() => removeToast(toast.id)}
            ></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export { ToastProvider };
