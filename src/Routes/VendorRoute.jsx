import { Navigate } from 'react-router'

import useRole from '../Hooks/useRole'
import Loading from '../Pages/Loading'


const VendorRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()

console.log('VendorRoute: Checking role');
  if (isRoleLoading) return <Loading/>
  if (role === 'vendor') return children
  return <Navigate to='/' replace='true' />
}

export default VendorRoute