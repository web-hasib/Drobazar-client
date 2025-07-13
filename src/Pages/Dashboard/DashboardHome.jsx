import React from "react";
import AdminDashboard from "./AdminDashboard";
import VendorDashboard from "./VendorDashboard";
import UserDashboard from "./UserDashboard";
import useRole from "./../../Hooks/useRole";
import Loading from "./../Loading";

const DashboardHome = () => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) {
    return <Loading />;
  }
  return (
    <div>
      {role === "admin" && (
        <div>
          <h1 className="text-3xl text-lime-500 text-center font-bold my-5">
            Admin Dashboard
          </h1>
          <AdminDashboard></AdminDashboard>
        </div>
      )}
      {role === "vendor" && (
        <div>
          <h1 className="text-3xl text-lime-500 text-center font-bold my-5">
            Vendor Dashboard
          </h1>
          <VendorDashboard></VendorDashboard>
        </div>
      )}
      {role === "user" && (
        <div>
          <h1 className="text-3xl text-lime-500 text-center font-bold my-5">
            User Dashboard
          </h1>
          <UserDashboard></UserDashboard>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
