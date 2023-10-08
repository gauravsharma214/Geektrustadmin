import React from "react";
import './css/pagination.css'
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination pagination-md justify-content-end">
      <li className="page-item">
        <button
          style={{ borderRadius: "50%",marginLeft:"5px" }}
          className="page-link btn-circle"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
      </li>
      <li className="page-item">
        <button
          style={{ borderRadius: "50%",marginLeft:"5px" }}
          className="page-link btn-circle"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lsaquo;
        </button>
      </li>
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`page-item ${
            currentPage === number ? "active" : ""
          } btn-circle`}
        >
          <button
            style={{ borderRadius: "50%" ,marginLeft:"5px"}}
            className="page-link btn-circle"
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        </li>
      ))}
      <li className="page-item">
        <button
          className="page-link btn-circle"
          style={{ borderRadius: "50%" ,marginLeft:"5px"}}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &rsaquo;
        </button>
      </li>
      <li className="page-item">
        <button
          style={{ borderRadius: "50%",marginLeft:"5px" }}
          className="page-link btn-circle"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
