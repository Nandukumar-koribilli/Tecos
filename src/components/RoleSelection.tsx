import React from 'react';
import { Tractor, Home } from 'lucide-react';
import { UserRole } from '../lib/supabase';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome to Smart Kisan</h1>
          <p className="text-lg text-gray-600">Choose your role to continue</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => onSelectRole('farmer')}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center hover:scale-105"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Tractor className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">I'm a Farmer</h2>
            <p className="text-gray-600">
              Find and rent agricultural land for your farming needs
            </p>
          </button>

          <button
            onClick={() => onSelectRole('landowner')}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center hover:scale-105"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
              <Home className="w-12 h-12 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">I'm a Landowner</h2>
            <p className="text-gray-600">
              List your agricultural land and connect with farmers
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
