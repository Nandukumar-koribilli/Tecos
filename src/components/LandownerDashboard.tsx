import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { landsAPI, profileAPI, Land } from '../lib/mongodb';
import { MapPin, DollarSign, Droplet, Mountain, Plus, Trash2, Database } from 'lucide-react';

export const LandownerDashboard: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [lands, setLands] = useState<Land[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProfileData, setEditingProfileData] = useState({
    email: '',
    phone: '',
    address: '',
  });
  const [editingProfile, setEditingProfile] = useState(false);

  const [landForm, setLandForm] = useState({
    title: '',
    description: '',
    location: '',
    area: '',
    price_per_acre: '',
    soil_type: '',
    water_availability: '',
    // Contact information fields
    owner_name: '',
    owner_phone: '',
    owner_email: '',
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchLands();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const profileData = await profileAPI.getProfile(user._id);
      if (profileData) {
        setEditingProfileData({
          email: profileData.email || '',
          phone: profileData.phone || '',
          address: profileData.address || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }

    setLoading(false);
  };

  const fetchLands = async () => {
    if (!user) return;

    try {
      const userLands = await landsAPI.getUserLands(user._id);
      setLands(userLands);
    } catch (error) {
      console.error('Error fetching lands:', error);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      await profileAPI.updateProfile(user._id, {
        email: editingProfileData.email,
        phone: editingProfileData.phone,
        address: editingProfileData.address,
      });

      await refreshProfile();
      setEditingProfile(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleAddLand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const landData = {
        owner_id: user._id,
        title: landForm.title,
        description: landForm.description,
        location: landForm.location,
        area: parseFloat(landForm.area),
        price_per_acre: landForm.price_per_acre ? parseFloat(landForm.price_per_acre) : null,
        soil_type: landForm.soil_type || null,
        water_availability: landForm.water_availability || null,
        status: 'available' as const,
      };

      await landsAPI.createLand(landData);
      console.log('Land added successfully');

      setLandForm({
        title: '',
        description: '',
        location: '',
        area: '',
        price_per_acre: '',
        soil_type: '',
        water_availability: '',
        owner_name: '',
        owner_phone: '',
        owner_email: '',
      });
      setShowAddForm(false);
      fetchLands();
    } catch (err) {
      console.error('Error in handleAddLand:', err);
      alert('Error adding land: ' + err);
    }
  };

  const handleDeleteLand = async (id: string) => {
    if (confirm('Are you sure you want to delete this land listing?')) {
      try {
        await landsAPI.deleteLand(id);
        fetchLands();
      } catch (error) {
        console.error('Error deleting land:', error);
        alert('Error deleting land: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    }
  };

  const handleCreateSampleData = async () => {
    if (!user) return;
    
    if (confirm('This will create 3 sample land listings. Continue?')) {
      // Create sample lands directly
      const sampleLands = [
        {
          owner_id: user._id,
          title: "Prime Agricultural Land - 50 Acres",
          description: "Beautiful fertile land perfect for farming. Located near water source with good soil quality.",
          location: "Punjab, India",
          area: 50,
          price_per_acre: 50000,
          soil_type: "Loamy",
          water_availability: "Well and canal nearby",
          status: "available" as const,
        },
        {
          owner_id: user._id,
          title: "Organic Farm Land - 25 Acres",
          description: "Certified organic land suitable for organic farming. Has been chemical-free for 5 years.",
          location: "Karnataka, India",
          area: 25,
          price_per_acre: 75000,
          soil_type: "Clay loam",
          water_availability: "Borewell and river access",
          status: "available" as const,
        },
        {
          owner_id: user._id,
          title: "Commercial Farm Land - 100 Acres",
          description: "Large commercial farming land with modern irrigation facilities.",
          location: "Maharashtra, India",
          area: 100,
          price_per_acre: 30000,
          soil_type: "Sandy loam",
          water_availability: "Drip irrigation system",
          status: "available" as const,
        }
      ];

      try {
        for (const land of sampleLands) {
          await landsAPI.createLand(land);
        }
        fetchLands();
        alert('Sample lands created successfully!');
      } catch (error) {
        console.error('Error creating sample lands:', error);
        alert('Error creating sample lands: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    }
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Landowner Dashboard</h1>
        <p className="text-gray-600">Manage your profile and land listings</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
          <button
            onClick={() => (editingProfile ? handleSaveProfile() : setEditingProfile(true))}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {editingProfile ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profile?.full_name || ''}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={editingProfileData.email}
              onChange={(e) =>
                setEditingProfileData({ ...editingProfileData, email: e.target.value })
              }
              disabled={!editingProfile}
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
              value={editingProfileData.phone}
              onChange={(e) =>
                setEditingProfileData({ ...editingProfileData, phone: e.target.value })
              }
              disabled={!editingProfile}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-50"
              placeholder="Your phone number"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              value={editingProfileData.address}
              onChange={(e) =>
                setEditingProfileData({ ...editingProfileData, address: e.target.value })
              }
              disabled={!editingProfile}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:bg-gray-50"
              placeholder="Your full address"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Land Listings</h2>
          <div className="flex space-x-3">
            <button
              onClick={handleCreateSampleData}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Database className="w-5 h-5" />
              <span>Create Sample Data</span>
            </button>
            <button
              onClick={() => {
                // Pre-fill contact fields with profile data
                setLandForm(prev => ({
                  ...prev,
                  owner_name: profile?.full_name || '',
                  owner_phone: profile?.phone || '',
                  owner_email: profile?.email || '',
                }));
                setShowAddForm(!showAddForm);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Land</span>
            </button>
          </div>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddLand} className="mb-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Land Listing</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={landForm.title}
                  onChange={(e) => setLandForm({ ...landForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="e.g., Prime Agricultural Land"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={landForm.location}
                  onChange={(e) => setLandForm({ ...landForm, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="e.g., County, State"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area (acres) *
                </label>
                <input
                  type="number"
                  value={landForm.area}
                  onChange={(e) => setLandForm({ ...landForm, area: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="e.g., 100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Acre (₹)
                </label>
                <input
                  type="number"
                  value={landForm.price_per_acre}
                  onChange={(e) => setLandForm({ ...landForm, price_per_acre: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="e.g., 50000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soil Type
                </label>
                <input
                  type="text"
                  value={landForm.soil_type}
                  onChange={(e) => setLandForm({ ...landForm, soil_type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="e.g., Loamy, Clay"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Water Availability
                </label>
                <input
                  type="text"
                  value={landForm.water_availability}
                  onChange={(e) =>
                    setLandForm({ ...landForm, water_availability: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="e.g., Well, River nearby"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={landForm.description}
                  onChange={(e) => setLandForm({ ...landForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="Describe your land..."
                />
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h4>
              <p className="text-sm text-gray-600 mb-4">This information will be shown to farmers who are interested in your land.</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={landForm.owner_name}
                    onChange={(e) => setLandForm({ ...landForm, owner_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={landForm.owner_phone}
                    onChange={(e) => setLandForm({ ...landForm, owner_phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="Your phone number"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={landForm.owner_email}
                    onChange={(e) => setLandForm({ ...landForm, owner_email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Land
              </button>
            </div>
          </form>
        )}

        {lands.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            You haven't added any land listings yet. Click "Add New Land" to get started!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lands.map((land) => (
              <div
                key={land._id}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{land.title}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      land.status === 'available'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {land.status}
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
                </div>

                <button
                  onClick={() => handleDeleteLand(land._id)}
                  className="w-full flex items-center justify-center space-x-2 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Listing</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
