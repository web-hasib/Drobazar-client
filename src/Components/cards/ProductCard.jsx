import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const {
    itemName,
    marketName,
    image,
    price,
  } = product || {};

  return (
    <Link className="w-full hover:scale-105 transition duration-300 ease-in-out " to={`/product/${product._id}`}>
    <Card className="relative bg-green-100/30 overflow-hidden hover:text-lime-500/70 group rounded-2xl shadow-md">
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
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
      </div>

      {/* Card Content */}
      <div className="relative z-10 p-4 hover:bg-green-100/30 hover:text-white">
        <CardBody className="p-0 mb-2">
          <div className="flex items-center justify-between">
            <Typography color="blue-gray" className="text-lg font-semibold">
              {itemName}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              ৳{price?.price} {price?.unit}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-65 mt-1"
          >
             Market: {marketName}
          </Typography>
        </CardBody>

        <CardFooter className="pt-4 px-0">
          <Button
            ripple={false}
            fullWidth
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105"
          >
            Details
          </Button>
        </CardFooter>
      </div>
    </Card>
    </Link>
  );
};

export default ProductCard;
