import React from 'react';
import { User } from '../types';

interface UserCardProps {
  user: User;
}

const roleColorMap: { [key: string]: string } = {
  Admin: 'bg-red-500 text-red-100',
  Developer: 'bg-blue-500 text-blue-100',
  Designer: 'bg-purple-500 text-purple-100',
  Manager: 'bg-green-500 text-green-100',
};

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const roleClasses = roleColorMap[user.role] || 'bg-gray-500 text-gray-100';

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold text-gray-400 flex-shrink-0">
          {user.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <h3 className="text-xl font-semibold text-white truncate">{user.name}</h3>
          <p className="text-gray-400 truncate">{user.email}</p>
        </div>
      </div>
      <div className="mt-4">
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${roleClasses}`}>
          {user.role}
        </span>
      </div>
    </div>
  );
};
