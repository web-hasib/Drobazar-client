import React from 'react';
import AdminDashboard from './AdminDashboard';
import VendorDashboard from './VendorDashboard';
import UserDashboard from './UserDashboard';

const DashboardHome = () => {
    return (
        <div>
            <AdminDashboard></AdminDashboard>
            <VendorDashboard></VendorDashboard>
            <UserDashboard></UserDashboard>
        </div>
    );
};

export default DashboardHome;