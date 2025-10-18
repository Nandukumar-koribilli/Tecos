import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Sprout, Store, TrendingUp, LogOut, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { signOut, profile } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Sprout className="w-8 h-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">Smart Kisan</span>
            </div>

            <div className="hidden md:flex space-x-4">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'dashboard'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => onNavigate('pest-store')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'pest-store'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Store className="w-5 h-5" />
                <span>Pest Store</span>
              </button>

              <button
                onClick={() => onNavigate('crop-predictor')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'crop-predictor'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                <span>Crop Yield Predictor</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{profile?.full_name}</p>
              <p className="text-xs text-gray-500 capitalize">{profile?.role}</p>
            </div>
            <button
              onClick={signOut}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        <div className="md:hidden flex space-x-2 pb-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
              currentPage === 'dashboard'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onNavigate('pest-store')}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
              currentPage === 'pest-store'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Store</span>
          </button>

          <button
            onClick={() => onNavigate('crop-predictor')}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
              currentPage === 'crop-predictor'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Predictor</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
