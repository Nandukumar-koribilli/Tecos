import React from 'react';
import { Tractor, Home } from 'lucide-react';
import { UserRole } from '../lib/supabase';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" 
      style={{
        background: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-400 mb-4 drop-shadow-lg">Welcome to Smart Kisan</h1>
          <p className="text-2xl text-white">Choose your role to continue</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => onSelectRole('farmer')}
            className="group bg-green-700/90 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center hover:scale-105 border border-green-400/50"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-green-400/20 rounded-full flex items-center justify-center group-hover:bg-green-400/30 transition-colors">
              <Tractor className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-green-400 mb-3 drop-shadow-lg">I'm a Farmer</h2>
            <p className="text-white text-lg">
              Find and rent agricultural land for your farming needs
            </p>
          </button>

          <button
            onClick={() => onSelectRole('landowner')}
            className="group bg-green-700/90 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center hover:scale-105 border border-green-400/50"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-green-400/20 rounded-full flex items-center justify-center group-hover:bg-green-400/30 transition-colors">
              <Home className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-green-400 mb-3 drop-shadow-lg">I'm a Landowner</h2>
            <p className="text-white text-lg">
              List your agricultural land and connect with farmers
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
