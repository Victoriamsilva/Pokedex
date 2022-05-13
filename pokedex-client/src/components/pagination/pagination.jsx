import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import "./pagination.scss"



export default function Pagination({ itensPerPage, totalItens, currentPage, onSelect = () => { } }) {
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setPageCount(Math.ceil(totalItens / itensPerPage));
  }, [itensPerPage]);

  const handlePageClick = (event) => {
    onSelect(event.selected);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      className="pagination-container"
    />
  );
}