import React from 'react';

const Dashboard = ({ username }) => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-800">
        Welcome to your Dashboard Admin!
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Explore your personalized settings and manage your account here.
      </p>
    </div>
  );
};

export default Dashboard;
