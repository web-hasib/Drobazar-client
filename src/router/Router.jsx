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
import VendorRoute from "../Routes/VendorRoute";
import AdminRoute from "../Routes/AdminRoute";
import RequestAdvertisement from "../Pages/VendorsPage/RequistAdvertisement";
import MyAdvertisements from "../Pages/VendorsPage/MyAdvertisements";
import AllAdvertisements from "../Pages/AdminsPage/AllAdvertisements";
import About from "../Pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-items",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path:'about',
        Component:About
      }
    ],
  },
  {
    path: "dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "be-vendor",
        element: (
          <PrivateRoute>
            <BeVendor />
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <VendorRoute>
              <AddProduct></AddProduct>
            </VendorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "request-advertisement",
        element: (
          <PrivateRoute>
            <VendorRoute>
              <RequestAdvertisement></RequestAdvertisement>
            </VendorRoute>
          </PrivateRoute>
        ),
      },
      {
        path:'my-advertisement',
        element:<PrivateRoute>
          <VendorRoute>
            <MyAdvertisements></MyAdvertisements>
          </VendorRoute>
        </PrivateRoute>
      },
      {
        path: "edit-product/:id",
        element: (
          <PrivateRoute>
            <VendorRoute>
              <EditProduct />
            </VendorRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "my-payments",
        element: (
          <PrivateRoute>
            <MyPayments />
          </PrivateRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <MyCarts></MyCarts>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "vendor-requests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <VendorRequests />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-products-admin",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllProductsAdmin />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path:'all-advertisements',
        element:<PrivateRoute>
          <AdminRoute>
            <AllAdvertisements></AllAdvertisements>
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <VendorRoute>
              <MyProducts />
            </VendorRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: Error,
  },
]);
