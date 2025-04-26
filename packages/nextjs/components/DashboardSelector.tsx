"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaBuilding, FaUserShield } from 'react-icons/fa';

type Role = 'investor' | 'issuer' | 'admin';

const DashboardSelector = ({ currentRole }: { currentRole: Role }) => {
  const router = useRouter();

  const handleRoleChange = (role: Role) => {
    // Navigate to the appropriate dashboard based on role
    switch (role) {
      case 'investor':
        router.push('/dashboard');
        break;
      case 'issuer':
        router.push('/dashboard/issuer');
        break;
      case 'admin':
        router.push('/dashboard/admin');
        break;
      default:
        router.push('/dashboard');
    }
  };

  return (
    <div className="fixed top-20 right-6 z-50">
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-primary">
          <span className="mr-2">
            {currentRole === 'investor' && <FaUser />}
            {currentRole === 'issuer' && <FaBuilding />}
            {currentRole === 'admin' && <FaUserShield />}
          </span>
          {currentRole === 'investor' && 'Investor View'}
          {currentRole === 'issuer' && 'Dashboard'}
          {currentRole === 'admin' && 'Admin View'}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-200 rounded-lg w-64">
          <li className={currentRole === 'investor' ? 'bg-base-300 rounded-lg' : ''}>
            <button onClick={() => handleRoleChange('investor')} className="flex items-center gap-3 p-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentRole === 'investor' ? 'bg-token-blue text-white' : 'bg-base-300'}`}>
                <FaUser />
              </div>
              <div className="text-left">
                <p className="font-medium">Investor Dashboard</p>
                <p className="text-xs text-estate-100">Manage your investments</p>
              </div>
            </button>
          </li>
          <li className={currentRole === 'issuer' ? 'bg-base-300 rounded-lg' : ''}>
            <button onClick={() => handleRoleChange('issuer')} className="flex items-center gap-3 p-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentRole === 'issuer' ? 'bg-token-green text-white' : 'bg-base-300'}`}>
                <FaBuilding />
              </div>
              <div className="text-left">
                <p className="font-medium">Asset Issuer Dashboard</p>
                <p className="text-xs text-estate-100">Manage your properties</p>
              </div>
            </button>
          </li>
          <li className={currentRole === 'admin' ? 'bg-base-300 rounded-lg' : ''}>
            <button onClick={() => handleRoleChange('admin')} className="flex items-center gap-3 p-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentRole === 'admin' ? 'bg-token-purple text-white' : 'bg-base-300'}`}>
                <FaUserShield />
              </div>
              <div className="text-left">
                <p className="font-medium">Admin Dashboard</p>
                <p className="text-xs text-estate-100">Platform management</p>
              </div>
            </button>
          </li>
        </ul>
      </div>
  
    </div>
  );
};

export default DashboardSelector;