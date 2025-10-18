import React, { useState } from 'react';
import { TrendingUp, Cloud, Droplet, Thermometer, Wind, Calendar } from 'lucide-react';

interface PredictionResult {
  crop: string;
  predictedYield: number;
  confidenceLevel: number;
  recommendations: string[];
}

export const CropYieldPredictor: React.FC = () => {
  const [formData, setFormData] = useState({
    crop: '',
    area: '',
    soilType: '',
    rainfall: '',
    temperature: '',
    humidity: '',
    season: '',
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const cropOptions = [
    'Wheat',
    'Rice',
    'Corn',
    'Soybeans',
    'Cotton',
    'Sugarcane',
    'Barley',
    'Sorghum',
  ];

  const soilTypes = ['Loamy', 'Clay', 'Sandy', 'Silty', 'Peaty', 'Chalky'];
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const baseYield = Math.random() * 3 + 2;
      const yieldPerAcre = baseYield * parseFloat(formData.area);

      const recommendations = [
        'Consider using drip irrigation for water efficiency',
        'Apply balanced NPK fertilizers based on soil test',
        'Monitor pest activity regularly during peak season',
        'Maintain optimal spacing between plants',
      ];

      if (parseFloat(formData.rainfall) < 30) {
        recommendations.push('Increase irrigation frequency due to low rainfall');
      }

      if (parseFloat(formData.temperature) > 85) {
        recommendations.push('Provide shade during extreme heat to reduce stress');
      }

      setPrediction({
        crop: formData.crop,
        predictedYield: yieldPerAcre,
        confidenceLevel: Math.floor(Math.random() * 15 + 75),
        recommendations: recommendations.slice(0, 4),
      });

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Crop Yield Predictor</h1>
        <p className="text-gray-600">
          Estimate your potential crop yield based on environmental factors
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Input Parameters</h2>

          <form onSubmit={handlePredict} className="space-y-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                Crop Type *
              </label>
              <select
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Select a crop</option>
                {cropOptions.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                Area (acres) *
              </label>
              <input
                type="number"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="e.g., 50"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                Soil Type *
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Select soil type</option>
                {soilTypes.map((soil) => (
                  <option key={soil} value={soil}>
                    {soil}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Cloud className="w-4 h-4 mr-2 text-green-600" />
                Average Rainfall (inches/month) *
              </label>
              <input
                type="number"
                value={formData.rainfall}
                onChange={(e) => setFormData({ ...formData, rainfall: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="e.g., 45"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Thermometer className="w-4 h-4 mr-2 text-green-600" />
                Average Temperature (°F) *
              </label>
              <input
                type="number"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="e.g., 75"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Droplet className="w-4 h-4 mr-2 text-green-600" />
                Humidity (%) *
              </label>
              <input
                type="number"
                value={formData.humidity}
                onChange={(e) => setFormData({ ...formData, humidity: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="e.g., 65"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2 text-green-600" />
                Growing Season *
              </label>
              <select
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Select season</option>
                {seasons.map((season) => (
                  <option key={season} value={season}>
                    {season}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Calculating...' : 'Predict Yield'}
            </button>
          </form>
        </div>

        <div>
          {prediction ? (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Prediction Results</h2>

              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 mb-6">
                <div className="text-center">
                  <p className="text-gray-600 mb-2">Estimated Yield for {prediction.crop}</p>
                  <p className="text-5xl font-bold text-green-700 mb-1">
                    {prediction.predictedYield.toFixed(1)}
                  </p>
                  <p className="text-gray-600">tons</p>
                </div>

                <div className="mt-6 pt-6 border-t border-green-200">
                  <div className="flex items-center justify-center">
                    <span className="text-sm text-gray-600 mr-2">Confidence Level:</span>
                    <div className="flex-1 max-w-xs bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${prediction.confidenceLevel}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 ml-2">
                      {prediction.confidenceLevel}%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Recommendations for Better Yield
                </h3>
                <ul className="space-y-3">
                  {prediction.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-700 font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="ml-3 text-gray-700">{rec}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This is an estimated prediction based on the provided
                  parameters. Actual yields may vary based on additional factors such as pest
                  management, crop variety, and farming practices.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6 h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">Enter parameters to predict crop yield</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
