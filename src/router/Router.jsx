import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddProduct from "../Pages/VendorsPage/AddProduct";
import PrivateRoute from "../Routes/PrivateRoute";
import Error from "../Pages/Error";
import DashboardLayout from "../Layouts/DashboardLayout";
import Profile from "../Pages/Profile";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import AllProducts from "../Pages/AllProducts";
import ProductDetails from "../Pages/ProductDetails";
import MyPayments from "../Pages/UsersPage/MyPayments";
import MyCarts from "../Pages/UsersPage/MyCart";
import ManageUsers from "../Pages/AdminsPage/ManageUsers";
import MyProducts from "../Pages/VendorsPage/MyProducts";
import AllProductsAdmin from "../Pages/AdminsPage/AllProductsAdmin";
import EditProduct from "../Pages/VendorsPage/EditProduct";
import BeVendor from "../Pages/UsersPage/BeVendor";
import VendorRequests from "../Pages/AdminsPage/VendorRequests";

export const router = createBrowserRouter([
    {
        path:'/',
        Component:MainLayout,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:'all-items',
                element: <AllProducts></AllProducts>
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path:'register',
                Component:Register
            },{
                path:'profile',
                element:<PrivateRoute><Profile/></PrivateRoute>
            }
        ,
           
            {
                path:'product/:id',
                element:<PrivateRoute><ProductDetails/></PrivateRoute>
        
            }
        ]
    },
    {
        path:'dashboard',
        Component: DashboardLayout,
        children:[
            {
                index:true,
                element:<DashboardHome></DashboardHome>
            },
            {
                path:'be-vendor',
                element:<PrivateRoute><BeVendor/></PrivateRoute>
            } 
            ,
            {
                path:'add-product',
                element:<PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            },
            {
                path:'edit-product/:id',
                element:<PrivateRoute><EditProduct/></PrivateRoute>
            },
            {
                path:'my-payments',
                element:<PrivateRoute><MyPayments/></PrivateRoute>
            },
            {
                path:'cart',
                element:<PrivateRoute><MyCarts></MyCarts></PrivateRoute>
            },
            {
                path:'manage-users',
                element:<PrivateRoute><ManageUsers/></PrivateRoute>
            },
            {
                path:'vendor-requests',
                element:<PrivateRoute><VendorRequests/></PrivateRoute>
            },
            {
                path: 'all-products-admin',
                element: <PrivateRoute><AllProductsAdmin /></PrivateRoute>
            },
            {
                path:'my-products',
                element:<PrivateRoute><MyProducts/></PrivateRoute>
            }
        ]
    },
    {
        path: '*',
        Component: Error
    }

])