export default function Pagination({ nextPage, prevPage }) {
    return (
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={prevPage}
          disabled={!prevPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={!nextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    );
  }