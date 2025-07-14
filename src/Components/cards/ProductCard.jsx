import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {

  const itemVariants = {
  hidden: { y: 20, opacity: 0 }, // Start 20px below and invisible
  visible: {
    y: 0, // Animate to original position
    opacity: 1, // Animate to fully visible
    transition: {
      type: "spring", // Use a spring animation for a bouncy feel
      stiffness: 100,
      damping: 10
    }
  },
};

  const {
    itemName,
    marketName,
    image,
    price,
  } = product || {};

  return (

   <motion.div className='w-full' key={product._id} variants={itemVariants}>
     <Link className="w-full hover:scale-105 transition duration-300 ease-in-out " to={`/product/${product._id}`}>
    <Card className="relative bg-base-content/10 overflow-hidden group  rounded-2xl shadow-md text-base-content hover:text-black">
      {/* Static Image */}
      <div className="h-60">
        <img
          src={image}
          alt={itemName}
          className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
      </div>

      {/* Hover Image (same or blurred version) */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <img
          src={image}
          alt="Blurred"
          className="h-full w-full object-cover scale-110 blur-[0px]"
        />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      {/* Card Content */}
      <div className="relative z-10 p-4 hover:bg-base-content/50 hover:text-base-100">
        <CardBody className="p-0 mb-2">
          <div className="flex items-center justify-between">
            <Typography color="blue-gray" className="text-lg font-semibold">
              {itemName}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              ৳ {price?.at(-1)?.price} {price?.at(-1)?.unit}
            </Typography>
          </div>
          <Typography
            variant="small"
           
            className="font-normal opacity-65 mt-1"
          >
             Market: {marketName}
          </Typography>
        </CardBody>

        
      </div>
    </Card>
    </Link>
   </motion.div>
  );
};

export default ProductCard;
