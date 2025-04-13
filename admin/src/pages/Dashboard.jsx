import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Welcome to the Dashboard!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium">Total Products</h2>
          <p className="text-2xl font-bold">125</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium">Total Orders</h2>
          <p className="text-2xl font-bold">56</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium">Revenue</h2>
          <p className="text-2xl font-bold">$1,245.00</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <ul className="space-y-2 mt-4">
          <li className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <span className="font-medium">New Order Received</span> - Order #456
          </li>
          <li className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <span className="font-medium">Product Added</span> - Product #123
          </li>
          <li className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <span className="font-medium">Inventory Update</span> - Product #789
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
