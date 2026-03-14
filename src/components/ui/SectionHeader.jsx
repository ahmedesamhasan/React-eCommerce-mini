function SectionHeader({ title, description, action }) {
  return (
    <div className='d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4'>
      <div>
        <h2 className='h3 mb-1'>{title}</h2>
        {description ? <p className='text-muted mb-0'>{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export default SectionHeader;
