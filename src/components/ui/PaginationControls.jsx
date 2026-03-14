function PaginationControls({ currentPage, totalPages, previousLabel, nextLabel, onPageChange }) {
  return (
    <div className='d-flex justify-content-center gap-2 mt-4'>
      <button
        type='button'
        className='btn btn-outline-dark'
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {previousLabel}
      </button>

      <button
        type='button'
        className='btn btn-outline-dark'
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {nextLabel}
      </button>
    </div>
  );
}

export default PaginationControls;
