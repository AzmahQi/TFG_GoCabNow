'use client'
import { LogoImage, Button } from '@/app/ui/ui';
import { signOut } from 'next-auth/react';

export default function SidePanel() {
  const handleLogout = async () => {
    await signOut();
    // Add any additional logout logic here
    console.log('Logging out...');
  };

  return (
    <>
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        {/* Logo */}
        <div className="text-2xl font-bold mb-4">
          <LogoImage />
          GoCabNow
        </div>

        {/* Navigation Links */}
        <ul className="mt-auto">
          <li className="mb-2">
            <a href="#" className="hover:text-gray-300">
              Dashboard
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="hover:text-gray-300">
              Bookings
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="hover:text-gray-300">
              Users
            </a>
          </li>
          {/* Add more navigation links as needed */}
        </ul>

        {/* Log Out Button */}
        <div className="flex flex-col mt-auto">
          <Button color="danger"
            onClick={handleLogout}
            
          >
            Log Out
          </Button>
        </div>
      </div>
    </>
  );
}