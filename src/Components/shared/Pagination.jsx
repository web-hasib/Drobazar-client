
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

const Pagination = ({ page, totalPages, setPage }) => {
  return (
    <div className="flex justify-center items-center gap-6 mt-10">
      {/* Prev Button */}
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="flex items-center justify-center rounded-full
                   bg-base-200 text-base-content hover:text-lime-300 
                   transition-transform duration-200 hover:scale-110 
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <IoIosArrowDropleftCircle size={40}/>
      </button>

      {/* Page Info */}
      <span className="font-semibold text-base-content text-sm">
        Page <span className='text-lg font-bold bg-base-200 p-1 rounded-lg text-lime-400 '>{page}</span> of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className="flex items-center justify-center rounded-full
                   bg-base-200 text-base-content hover:text-lime-300 
                   transition-transform duration-200 hover:scale-110 
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <IoIosArrowDroprightCircle size={40} />
      </button>
    </div>
  );
};

export default Pagination;
