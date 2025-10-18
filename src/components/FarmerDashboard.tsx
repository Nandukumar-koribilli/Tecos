import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, FarmerProfile, Land } from '../lib/supabase';
import { MapPin, DollarSign, Droplet, Mountain } from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const { user, refreshProfile } = useAuth();
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile | null>(null);
  const [lands, setLands] = useState<Land[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    farm_size: '',
    crop_types: '',
    experience_years: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      fetchFarmerProfile();
      fetchLands();
    }
  }, [user]);

  const fetchFarmerProfile = async () => {
    if (!user) return;

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    const { data: farmerData } = await supabase
      .from('farmer_profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (farmerData) {
      setFarmerProfile(farmerData);
      setFormData({
        farm_size: farmerData.farm_size?.toString() || '',
        crop_types: farmerData.crop_types?.join(', ') || '',
        experience_years: farmerData.experience_years?.toString() || '',
        phone: profileData?.phone || '',
        address: profileData?.address || '',
      });
    }

    setLoading(false);
  };

  const fetchLands = async () => {
    const { data } = await supabase
      .from('lands')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false });

    if (data) {
      setLands(data);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    const cropTypesArray = formData.crop_types
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c);

    await supabase
      .from('profiles')
      .update({
        phone: formData.phone,
        address: formData.address,
      })
      .eq('id', user.id);

    await supabase
      .from('farmer_profiles')
      .update({
        farm_size: parseFloat(formData.farm_size) || null,
        crop_types: cropTypesArray,
        experience_years: parseInt(formData.experience_years) || 0,
      })
      .eq('user_id', user.id);

    await refreshProfile();
    await fetchFarmerProfile();
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmer Dashboard</h1>
        <p className="text-gray-600">Manage your profile and explore available lands</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
          <button
            onClick={() => (editing ? handleSaveProfile() : setEditing(true))}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {editing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-50"
              placeholder="Your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Farm Size (acres)
            </label>
            <input
              type="number"
              value={formData.farm_size}
              onChange={(e) => setFormData({ ...formData, farm_size: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-50"
              placeholder="e.g., 50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience (years)
            </label>
            <input
              type="number"
              value={formData.experience_years}
              onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-50"
              placeholder="e.g., 10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Crop Types (comma separated)
            </label>
            <input
              type="text"
              value={formData.crop_types}
              onChange={(e) => setFormData({ ...formData, crop_types: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-50"
              placeholder="e.g., Wheat, Rice, Corn"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              disabled={!editing}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-50"
              placeholder="Your full address"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Lands</h2>

        {lands.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No lands available at the moment. Check back later!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lands.map((land) => (
              <div
                key={land.id}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{land.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{land.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">{land.location}</span>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <Mountain className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">{land.area} acres</span>
                  </div>

                  {land.price_per_acre && (
                    <div className="flex items-center text-gray-700">
                      <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                      <span className="text-sm">${land.price_per_acre}/acre</span>
                    </div>
                  )}

                  {land.soil_type && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Soil:</span> {land.soil_type}
                    </div>
                  )}

                  {land.water_availability && (
                    <div className="flex items-center text-gray-700">
                      <Droplet className="w-4 h-4 mr-2 text-green-600" />
                      <span className="text-sm">{land.water_availability}</span>
                    </div>
                  )}
                </div>

                <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Contact Owner
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
