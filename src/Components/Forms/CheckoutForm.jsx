import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import './checkoutForm.css'
import { use, useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'

import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { AuthContext } from '../../provider/AuthProvider'

const CheckoutForm = ({ totalPrice, closeModal, orderData }) => {
  const { user } = use(AuthContext)
  const axiosSecure = useAxiosSecure()
  const stripe = useStripe()
  const elements = useElements()
  const [cardError, setCardError] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const { data } = await axiosSecure.post('/create-payment-intent', {
          productId: orderData?.productId,
          quantity: orderData?.quantity,
        })
        setClientSecret(data?.clientSecret)
      } catch (err) {
        console.error('Error getting client secret---->>:', err)
        toast.error(err?.response?.data?.message || 'Failed to initiate payment.');
      }
    }

    if (orderData?.productId && orderData?.quantity > 0) {
      getClientSecret()
    }
  }, [axiosSecure, orderData])

  const handleSubmit = async event => {
    event.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)

    const card = elements.getElement(CardElement)
    if (!card) {
      setCardError('Card not found')
      setProcessing(false)
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })

    if (error) {
      setCardError(error.message)
      setProcessing(false)
      return
    } else {
      setCardError(null)
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName || 'Anonymous',
          email: user?.email,
        },
      },
    })

    if (result?.error) {
      setCardError(result?.error?.message)
      setProcessing(false)
      return
    }

    if (result?.paymentIntent?.status === 'succeeded') {
      const paymentInfo = {
        ...orderData,
        productsTotalCost: totalPrice,
        transactionId: result?.paymentIntent?.id,
       
      }
console.log('hellow ',paymentInfo);
      // console.log("paymentInfor after payment", paymentInfo);
        //  setProcessing(false)
      try {
        const { data } = await axiosSecure.post('/payments', paymentInfo)
        if (data?.insertedId) {
          toast.success('✅ Order Placed Successfully!')
        }
      } catch (err) {
        toast.error('Order saving failed.')
        console.error(err)
      } finally {
        setProcessing(false)
        setCardError(null)
        closeModal()
      }
    }

    setProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />

      {cardError && <p className='text-red-500 mt-2'>{cardError}</p>}
      {totalPrice < 50 && (
  <div className="text-sm text-yellow-600 bg-yellow-100 border border-yellow-300 p-2 rounded">
    This product price is below the minimum Stripe amount. Increase quantity to reach ৳50 or more.
  </div>
)}

      <div className='flex justify-between mt-6'>
        <button
          className='px-4 py-2 bg-green-500 text-white rounded-md disabled:cursor-not-allowed disabled:bg-green-50 disabled:text-gray-700'
          type='submit'
          disabled={!stripe || processing || totalPrice <= 50}
        >
          {processing ? <ClipLoader size={22} color="#fff" /> : `Pay ৳${totalPrice}`}
        </button>

        <button
          onClick={closeModal}
          className='px-4 py-2 bg-red-400 text-white rounded-md'
          type='button'
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default CheckoutForm
