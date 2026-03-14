function PageIntro({ eyebrow, title, description, actions }) {
  return (
    <div className='hero-panel p-4 p-lg-5 mb-4'>
      {eyebrow && <span className='hero-badge'>{eyebrow}</span>}
      <h1 className='display-6 fw-bold mt-3 mb-3'>{title}</h1>
      {description && <p className='hero-copy mb-0'>{description}</p>}
      {actions ? <div className='d-flex flex-wrap gap-3 mt-4'>{actions}</div> : null}
    </div>
  );
}

export default PageIntro;
