import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FaStore, FaCalendarAlt, FaTag, FaUser } from 'react-icons/fa';
import { MdOutlineAttachMoney } from 'react-icons/md';
import AuthButton from '../shared/Buttons/AuthButton';

const SIngleProductCard = ({ product }) => {
  const {
    _id,
    itemName,
    image,
    price,
    date,
    vendor,
    marketName,
    category,
  } = product;

  return (
    <div className="bg-base-100/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:scale-[1.01]">
      {/* Image */}
      <div className="h-70 w-full overflow-hidden">
        <img
          src={image}
          alt={itemName}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Body */}
      <div className="p-4 space-y-2 text-base-content">
        {/* Title & Category */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold line-clamp-1">{itemName}</h3>
          <span className="text-xs bg-lime-50 text-lime-500 font-semibold px-2 py-1 rounded-full">
            <FaTag className="inline mr-1" />
            {category}
          </span>
        </div>

        {/* Info Grid */}
        <div className="gap-2 text-sm">
        <div className='flex justify-between items-center'>
              <div className="flex items-center gap-2">
            <FaStore className="text-lime-400" />
            <span className="font-medium line-clamp-1">{marketName}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-lime-400" />
            <span>{format(new Date(date), 'PPP')}</span>
          </div>
        </div>

          <div className="flex items-center gap-2 pt-1">
            <MdOutlineAttachMoney className="text-lime-300" />
            <span className="font-semibold text-lime-500">
              ৳{price?.price}
              <span className="ml-1 text-xs">{price?.unit}</span>
            </span>
          </div>
        </div>

        {/* Vendor */}
        <div className="flex items-center gap-3 pt-1">
          <img
            src={vendor?.photo || 'https://i.ibb.co/MynfYJ2d/images.jpg'}
            alt={vendor?.name || 'Vendor'}
            className="w-7 h-7 rounded-full object-cover border border-base-300"
          />
          <div>
            <div className="flex items-center gap-1">
              <FaUser className="text-lime-400"size={10} />
              <span className="line-clamp-1 text-sm font-thin">{vendor?.name}</span>
            </div>
            <p className="text-xs opacity-60 truncate">{vendor?.email}</p>
          </div>
        </div>

        {/* View Button */}
        <Link to={`/product/${_id}`}>
          <button
      
      className="relative inline-flex font-semibold items-center w-full justify-center px-6 py-2 rounded-2xl border border-lime-600/70 hover:border-green-100/70 hover:text-white bg-green-400/5 text-lime-600 overflow-hidden group"
    >
      <span className="absolute inset-0 bg-lime-600/70 transition-transform duration-300 scale-x-0 origin-left group-hover:scale-x-100"></span>
      <span className="relative z-10">
        
        View Details
      </span>
    </button>
        </Link>
      </div>
    </div>
  );
};

export default SIngleProductCard;
