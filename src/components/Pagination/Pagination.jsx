import {useState} from 'react';

const usePagination = () => {
  const [page, setPage] = useState(0);

  const Pagination = ({hasMore}) => (
    <>
      <span className="text-white mr-3">Current Page: {page + 1}</span>
      <button
        onClick={() => setPage(old => Math.max(old - 1, 0))}
        disabled={page === 0}
        className="btn btn-white"
      >
        PREV
      </button>
      <button
        onClick={() => setPage(old => (hasMore ? old + 1 : old))}
        disabled={!hasMore}
        className="btn btn-white"
      >
        NEXT
      </button>
    </>
  );

  return {page, setPage, Pagination};
};

export default usePagination;
