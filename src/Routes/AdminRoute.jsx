import { Navigate } from 'react-router'

import useRole from '../Hooks/useRole'
import Loading from '../Pages/Loading'


const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()
console.log('AdminRoute: Checking role');
 
  if (isRoleLoading) return <Loading/>
  if (role === 'admin') return children
  return <Navigate to='/' replace='true' />
}

export default AdminRoute