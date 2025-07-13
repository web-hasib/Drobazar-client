import React, { use } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaUserEdit,
  FaSearchLocation,
  FaShoppingCart,
  FaUsers,
  FaRegFileAlt,
} from "react-icons/fa";
import Logo from "../Components/shared/Logo";
import ThemeButton from "../Components/shared/Buttons/ThemeButton";
import { ThemeContext } from "../Theme/ThemeProvider";
import { LuSunMoon } from "react-icons/lu";
import { CiLight } from "react-icons/ci";
import { AuthContext } from "../provider/AuthProvider";
import useRole from "../Hooks/useRole";
import Loading from "../Pages/Loading";
import "./dashboard.css"
import DayNightToggle from "../Components/shared/Buttons/DayNightToggle";

const links = (
  <>
    <NavLink className="hover:text-black hover:font-bold" to="/">
      {" "}
      Home
    </NavLink>
    {/* <NavLink className="hover:text-black hover:font-bold" to="/allRecipes">
        {" "}
        All Recipes
      </NavLink> */}

    <NavLink className="hover:text-black hover:font-bold" to="/dashboard">
      {" "}
      Dashboard
    </NavLink>
    <NavLink className="hover:text-black hover:font-bold" to="/about">
      {" "}
      About
    </NavLink>
    <NavLink className="hover:text-black hover:font-bold" to="/contact">
      {" "}
      Contact
    </NavLink>
  </>
);

const DashboardLayout = () => {
  const { theme, toggleTheme } = use(ThemeContext);
  const { user } = use(AuthContext);
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) return <Loading/>
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="mx-2 flex-1 px-2 flex items-center justify-between lg:hidden">
            <Logo />
            <h1 className="text-primary">Dashboard</h1>
          </div>

          <div className=" ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
        </div>
        {/* Page content here */}
        <div className="">
          {/* start  */}
          <div className="navbar hidden  lg:visible bg-base-200/40 w-full lg:flex">
            <div className="mx-2 flex-1 px-2  items-center justify-between lg:flex">
              {/* links  */}
              <ul className="menu menu-horizontal px-1 gap-3">{links}</ul>
              <div className="flex items-center gap-2">
                {/* <ThemeButton
                  onClick={toggleTheme}
                  label={
                    theme === "light" ? (
                      <LuSunMoon size={20} color="black" />
                    ) : (
                      <CiLight size={20} color="white" />
                    )
                  }
                ></ThemeButton> */}
                 <DayNightToggle isDarkMode={theme === 'dark'} toggleTheme={toggleTheme} size={25} />
                {user?.photoURL && (
                  <Link to="/profile" className="relative group inline-block">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={user.photoURL}
                      alt=""
                    />
                    <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      {user.displayName}
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* finish  */}
        </div>
        <main className="min-h-[calc(100vh-60px)] flex-1 p-4">
          <Outlet></Outlet>
        </main>
        <div>
          <p className="text-[6px] md:text-[10px] text-center lg:text-sm font-thin italic text-gray-400">
            Copyright © {new Date().getFullYear()} - All right reserved by Hasib
            Industries Ltd
          </p>
        </div>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-2 space-y-3">
          {/* Sidebar content here */}
          <Logo />
          <li className="mt-5">
            <NavLink to="/dashboard">
              <FaHome className="inline-block mr-2" />
              Home
            </NavLink>
          </li>
          {role === 'user' && (
  <li>
    <NavLink to="/dashboard/be-vendor">
    <FaRegFileAlt />
    Be a Vendor
    </NavLink>
  </li>
)}
{
  role === 'vendor' && (
    <>
     <li>
            <NavLink to="/dashboard/add-product">
              <FaUserEdit className="inline-block mr-2" />
              add Product
            </NavLink>
          </li>
     <li>
            <NavLink to="/dashboard/request-advertisement">
              <FaUserEdit className="inline-block mr-2" />
              request advertisement
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-products">
              <FaBoxOpen className="inline-block mr-2" />
              My Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-advertisement">
              <FaBoxOpen className="inline-block mr-2" />
              My Advertisement
            </NavLink>
          </li>
    </>
  )
}
         
          <li>
            <NavLink to="/dashboard/my-payments">
              <FaMoneyCheckAlt className="inline-block mr-2" />
              My Payments
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">
              <FaShoppingCart className="inline-block mr-2" />
              My Cart
            </NavLink>
          </li>
          {role === 'admin' && (
            <>
             <li>
            <NavLink to="/dashboard/manage-users">
              <FaUsers className="inline-block mr-2" />
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-products-admin">
              <FaBoxOpen className="inline-block mr-2" />
             All Products (Admin)
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-advertisements">
              <FaBoxOpen className="inline-block mr-2" />
              all Advertisement
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/vendor-requests">
              <FaSearchLocation className="inline-block mr-2" />
              Vendor Requests
            </NavLink>
          </li>
            </>
          )}
         
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
