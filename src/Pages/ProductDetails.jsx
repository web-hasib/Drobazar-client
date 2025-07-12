import { useParams } from "react-router";
import React, { useEffect, useState, use } from "react";
import axios from "axios";
import { format } from "date-fns";
import { FaStar } from "react-icons/fa";
import { useForm } from "react-hook-form";

import Loading from "./Loading";

import { AuthContext } from "../provider/AuthProvider";
import PurchaseModal from "../Components/Modals/PurchaseModal";
import PayButton from "../Components/shared/Buttons/PayButton";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading />;
  if (!product)
    return <p className="text-center py-20 text-red-500">Product not found</p>;

  const {
    itemName,
    image,
    price,
    description,
    marketName,
    marketDescription,
    vendor,
    category,
    date,
    reviews = [],
  } = product;

  const isVendor = user?.email === vendor?.email;
  const hasReviewed = reviews.find((r) => r.email === user?.email);

  const onSubmit = async (data) => {
    const review = {
      email: user.email,
      rating,
      message: data.message,
      time: new Date().toISOString(),
    };
    console.log(review);
    try {
      if (hasReviewed) {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/product/${id}/review`,
          review
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/product/review/${id}`,
          review
        );
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/${id}`
      );
      setProduct(res.data);
      reset();
      setRating(0);
    } catch (err) {
      console.error("Review error:", err);
    }
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-base-content">
      <div className="bg-base-200/20 rounded-lg shadow lg:p-2 space-y-6">
        {/* Product Info */}
        <div className="flex flex-col lg:flex-row gap-6">
          <img
            src={image}
            alt={itemName}
            className="w-full lg:w-1/2 rounded-md object-cover max-h-96"
          />
          <div className="space-y-2 lg:w-1/2">
            <h2 className="text-2xl font-bold">{itemName}</h2>
            <span className="inline-block bg-lime-100 text-lime-700 px-2 py-1 rounded text-sm">
              {category}
            </span>
            <p className="text-xl font-semibold mt-2">
              ৳ {price?.at(-1)?.price}{" "}
              <span className="text-sm text-gray-500">
                {price?.at(-1)?.unit}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              🗓 {format(new Date(date), "PPP")}
            </p>
            <p className="mt-2 text-sm">{description}</p>
            {/* Purchase button           */}
            <button
              disabled={user?.email === vendor?.email}
              // || role !== 'user'
              onClick={() => setIsOpen(true)}
            >
              <PayButton text="Order Now"></PayButton>
            </button>
          </div>
        </div>

        {/* Market Description */}
        <div>
          <h3 className="text-lg font-bold">Market Info</h3>
          <p>
            <span className="font-medium">Market Name:</span> {marketName}
          </p>
          <p>
            <span className="font-medium">Details:</span> {marketDescription}
          </p>
        </div>

        {/* Vendor Info */}
        <div>
          <h3 className="text-lg font-bold mb-2">Vendor Info</h3>
          <div className="flex items-center gap-3">
            <img
              src={vendor?.photo}
              alt={vendor?.name}
              className="w-12 h-12 rounded-full border"
            />
            <div>
              <p className="font-semibold">{vendor?.name}</p>
              <p className="text-sm text-gray-500">{vendor?.email}</p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-base-content mb-4">
            Reviews ({reviews.length})
          </h3>

          {reviews.length === 0 ? (
            <p className="text-sm text-base-content/60">No reviews yet.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((review, index) => (
                <li
                  key={index}
                  className="bg-base-200 p-4 rounded-lg border border-base-300 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row mb-3 justify-between">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow">
                        {review.email?.slice(0, 1).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-base-content">
                          {review.email}
                        </p>
                        <p className="text-xs text-base-content/50">
                          {format(new Date(review.time), "PPP")}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-1 text-yellow-400 text-sm mb-7">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < review.rating
                              ? "fill-yellow-400"
                              : "text-base-content/30"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-base-content/50">
                    {review.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Review Form */}
        <div className="mt-12 bg-base-200 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Leave a Review</h3>

          {isVendor && (
            <p className="text-sm text-red-500">
              Vendors cannot review their own product.
            </p>
          )}

          {!isVendor && hasReviewed && (
            <p className="text-sm text-yellow-600">
              You already reviewed this product. You can edit below.
            </p>
          )}

          {!isVendor && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Your Rating:
                </label>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setRating(i + 1)}
                      className={`text-2xl ${
                        i < rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Your Message:
                </label>
                <textarea
                  {...register("message", { required: true })}
                  defaultValue={hasReviewed?.message || ""}
                  rows={3}
                  className="textarea textarea-bordered w-full mt-1"
                  placeholder="Write your experience..."
                />
              </div>

              <button
                type="submit"
                disabled={!rating}
                className="btn btn-primary px-5"
              >
                {hasReviewed ? "Update Review" : "Submit Review"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <PurchaseModal
        product={product}
        closeModal={closeModal}
        isOpen={isOpen}
        price={price?.at(-1)?.price}
      />
    </div>
  );
};

export default ProductDetails;
