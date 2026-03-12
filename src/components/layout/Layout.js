import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

export default function Layout() {
  const { sidebarOpen } = useSelector((state) => state.ui);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          sidebarOpen ? 'ml-0 lg:ml-64' : 'ml-0'
        }`}
      >
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
