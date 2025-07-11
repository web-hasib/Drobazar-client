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
            } ,{
                path:'add-product',
                element:<PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            },
            {
                path:'my-payments',
                element:<PrivateRoute><MyPayments/></PrivateRoute>
            }
        ]
    },
    {
        path: '*',
        Component: Error
    }

])