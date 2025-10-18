import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { landsAPI, profileAPI } from '../lib/mongodb';
import { MapPin, DollarSign, Droplet, Mountain, Phone, Mail } from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [availableLands, setAvailableLands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedLand, setSelectedLand] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience_years: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      fetchFarmerProfile();
      fetchAvailableLands();
    }
  }, [user]);

  const fetchFarmerProfile = async () => {
    if (!user) return;

    try {
      const profileData = await profileAPI.getProfile(user._id);
      if (profileData) {
        setFormData({
          name: profileData.full_name || '',
          email: profileData.email || '',
          phone: profileData.phone || '',
          experience_years: '', // MongoDB doesn't have separate farmer_profiles table
          address: profileData.address || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }

    setLoading(false);
  };

  const fetchAvailableLands = async () => {
    try {
      const lands = await landsAPI.getLands();
      const availableLands = lands.filter(land => land.status === 'available');
      setAvailableLands(availableLands);
    } catch (err) {
      console.error('Error in fetchAvailableLands:', err);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      await profileAPI.updateProfile(user._id, {
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      });

      await refreshProfile();
      await fetchFarmerProfile();
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleContactLandowner = (land: any) => {
    setSelectedLand(land);
    setShowContactModal(true);
  };

  const handleCallLandowner = () => {
    if (selectedLand?.profiles?.phone) {
      window.open(`tel:${selectedLand.profiles.phone}`);
    }
  };

  const handleEmailLandowner = () => {
    if (selectedLand?.profiles?.email) {
      const landowner = selectedLand.profiles;
      const subject = `Interest in Land: ${selectedLand.title}`;
      const body = `Hello ${landowner.full_name},\n\nI am interested in your land listing "${selectedLand.title}" located in ${selectedLand.location}.\n\nPlease contact me to discuss further details.\n\nBest regards,\n${formData.name}`;
      
      const mailtoLink = `mailto:${landowner.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink);
    }
  };

  const handleCopyContactInfo = () => {
    const landowner = selectedLand?.profiles;
    const contactText = `Name: ${landowner?.full_name}\nPhone: ${landowner?.phone || 'Not provided'}\nEmail: ${landowner?.email || 'Not provided'}`;
    
    navigator.clipboard.writeText(contactText).then(() => {
      alert('Contact information copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy contact information.');
    });
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
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-50"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-50"
              placeholder="your.email@example.com"
            />
          </div>

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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Available Lands</h2>
          <div className="flex space-x-3">
            <button
              onClick={fetchAvailableLands}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Lands
            </button>
            <button
              onClick={async () => {
                console.log('Current availableLands state:', availableLands);
                console.log('User:', user);
                console.log('Profile:', profile);
                
                // Test fetching profiles directly
                if (user) {
                  try {
                    const allProfiles = await profileAPI.getProfile(user._id);
                    console.log('Profile data:', allProfiles);
                  } catch (error) {
                    console.log('Profile error:', error);
                  }
                }
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Debug Info
            </button>
          </div>
        </div>

        {availableLands.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No available lands found. Check back later for new listings!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableLands.map((land) => (
              <div
                key={land.id}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{land.title}</h3>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    Available
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{land.description}</p>

                <div className="space-y-2 mb-4">
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
                      <span className="text-sm">₹{land.price_per_acre.toLocaleString()}/acre</span>
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

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Owner:</span> {land.profiles?.full_name}
                  </div>
                </div>

                <button
                  onClick={() => handleContactLandowner(land)}
                  className="w-full flex items-center justify-center space-x-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Contact Owner</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && selectedLand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Contact Landowner</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {selectedLand.title}
              </h4>
              <p className="text-gray-600 mb-4">{selectedLand.location}</p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-800 mb-2">Landowner Details:</h5>
                <div className="space-y-1">
                  <p><span className="font-medium">Name:</span> {selectedLand.profiles?.full_name || 'Not provided'}</p>
                  <p><span className="font-medium">Phone:</span> {selectedLand.profiles?.phone || 'Not provided'}</p>
                  <p><span className="font-medium">Email:</span> {selectedLand.profiles?.email || 'Not provided'}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              {selectedLand.profiles?.phone && (
                <button
                  onClick={handleCallLandowner}
                  className="flex-1 flex items-center justify-center space-x-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </button>
              )}
              
              {selectedLand.profiles?.email && (
                <button
                  onClick={handleEmailLandowner}
                  className="flex-1 flex items-center justify-center space-x-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </button>
              )}
              
              <button
                onClick={handleCopyContactInfo}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
