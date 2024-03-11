function Pagination({
  productsPerPage,
  totalProducts,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4" aria-label="Page navigation">
      <ul className="pagination flex gap-2 items-center ">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? "active" : ""}`}
          >
            <button
              onClick={() => setCurrentPage(number)}
              className={`page-link font-bold text-lg ${
                number === currentPage ? "bg-gray-900" : "bg-gray-700"
              } text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
