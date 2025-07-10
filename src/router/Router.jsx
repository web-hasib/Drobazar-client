import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddProduct from "../Pages/VendorsPage/AddProduct";
import PrivateRoute from "../Routes/PrivateRoute";
import Error from "../Pages/Error";

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
                element: <h2>All items</h2>
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path:'register',
                Component:Register
            }
        ,
            {
                path:'add-product',
                element:<PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            }
        ]
    },
    {
        path: '*',
        Component: Error
    }

])