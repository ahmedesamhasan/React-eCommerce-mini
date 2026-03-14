function EmptyState({ title, description, action }) {
  return (
    <div className='empty-state text-center py-5'>
      <h2 className='h4 mb-2'>{title}</h2>
      <p className='text-muted mb-0'>{description}</p>
      {action ? <div className='mt-4'>{action}</div> : null}
    </div>
  );
}

export default EmptyState;
