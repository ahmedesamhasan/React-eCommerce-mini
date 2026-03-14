function ErrorState({ message, actionLabel, onRetry }) {
  return (
    <div className='alert alert-danger d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3'>
      <span>{message}</span>
      {onRetry ? (
        <button type='button' className='btn btn-danger btn-sm' onClick={onRetry}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

export default ErrorState;
