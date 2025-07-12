import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

import { use, useEffect, useState } from 'react'


import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { AuthContext } from '../../provider/AuthProvider'
import { toast } from 'react-toastify'
import CheckoutForm from '../Forms/CheckoutForm'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
const PurchaseModal = ({ closeModal, isOpen, product,price  }) => {
  const { user } = use(AuthContext)
  // return console.log("price in parches modal: ", price);
//   console.log(user)
  const {_id,itemName,category,image} = product || {}
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(price)
  const [orderData, setOrderData] = useState({
    
    productId: _id,
    quantity: 1,
    price: price,
    itemName: itemName,
    category: category,
    image: image,
  })

  useEffect(() => {
    if (user)
      setOrderData(prev => {
        return {
          ...prev,
          customer: {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
          },
        }
      })
  }, [user])
  
  const handleQuantity = value => {
    const totalQuantity = parseInt(value)
    
    const calculatedPrice = totalQuantity * price
    setSelectedQuantity(totalQuantity)
    setTotalPrice(calculatedPrice)

    setOrderData(prev => {
      return {
        ...prev,
        price: calculatedPrice,
        quantity: totalQuantity,
      }
    })
  }
// return console.log("orderData in purchase modal: ", orderData);
  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none '
      onClose={closeModal}
    >
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-md bg-base-300 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
          >
            <DialogTitle
              as='h3'
              className='text-lg font-medium text-center leading-6 text-gray-900'
            >
              Review Info Before Purchase
            </DialogTitle>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Item name: {itemName}</p>
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Category: {category}</p>
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>
                Customer: {user?.displayName}
              </p>
            </div>

            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Price Per {product?.price?.unit}: $ {price}</p>
            </div>
            
            <hr className='mt-2' />
            <p className='text-base-content'>Order Info:</p>
            {/* <div className='mt-2'>
              <input
                value={selectedQuantity}
                onChange={e => handleQuantity(e.target.value)}
                type='number'
                min={1}
                className='border px-3 py-1'
              />
            </div> */}
            <div className="flex items-center gap-3 mt-2">
  <button
    onClick={() => {
      if (selectedQuantity > 1) {
        handleQuantity(selectedQuantity - 1);
      }
    }}
    className="px-3 py-1 bg-base-100 text-lg rounded-full hover:bg-lime-100"
  >
    −
  </button>

  <span className="font-semibold text-lg">{selectedQuantity}</span>

  <button
    onClick={() => handleQuantity(selectedQuantity + 1)}
    className="px-3 py-1 bg-base-100 text-lg rounded-full hover:bg-lime-100"
  >
    +
  </button>
</div>

            <div className='mt-2'>
              <p className='text-sm text-gray-500'>
                Selected Quantity: {selectedQuantity}
              </p>
            </div>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Total Price: {totalPrice}</p>
            </div>
            {/* Stripe Checkout form */}
            <Elements stripe={stripePromise}>
              <CheckoutForm
                totalPrice={totalPrice}
                closeModal={closeModal}
                orderData={orderData}
                
              />
            </Elements>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default PurchaseModal