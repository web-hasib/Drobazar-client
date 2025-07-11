import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { AuthContext } from '../../provider/AuthProvider'
import { FaCheckCircle } from 'react-icons/fa'

const MyPayments = () => {
  const { user } = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()

  const { data: myPayments = [], isLoading } = useQuery({
    queryKey: ['myPayments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`)
      return res.data
    },
  })

  if (isLoading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6">My Payments</h2>
      {myPayments.length === 0 ? (
        <p className="text-gray-500">You have no payment history yet.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow-md">
          <table className="table w-full border">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Total Cost</th>
                <th>Transaction ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myPayments.map((payment, index) => (
                <tr key={payment._id} className="hover">
                  <td>{index + 1}</td>
                  <td className="flex items-center gap-2">
                    <img
                      src={payment.image}
                      alt={payment.itemName}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>{payment.itemName}</span>
                  </td>
                  <td>{payment.category}</td>
                  <td>{payment.quantity}</td>
                  <td>${payment.productsTotalCost}</td>
                  <td className="text-sm break-all">{payment.transactionId}</td>
                  <td className="text-green-600 font-medium flex items-center gap-1">
                    Paid <FaCheckCircle className="text-green-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default MyPayments
