import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../Pages/Loading';





const PrivateRoute = ({children}) => {
    const {user,loading}= use(AuthContext)
    const location = useLocation();
    // console.log(location.pathname);
    // console.log(user);
    if(loading) {
        return <Loading></Loading>
    }
   if(user && user?.email){
    return children
   }
   return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;