import React, { useState } from 'react';
import { Bug, ShoppingCart, Filter, Star, X, Plus, Minus, CheckCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  inStock: boolean;
}

const pestProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Neem Oil Spray',
    category: 'Organic',
    price: 2000,
    rating: 4.5,
    description: 'Natural pest control solution for various garden pests',
    inStock: true,
  },
  {
    id: '2',
    name: 'Insecticidal Soap Concentrate',
    category: 'Organic',
    price: 1500,
    rating: 4.3,
    description: 'Effective against aphids, mites, and soft-bodied insects',
    inStock: true,
  },
  {
    id: '3',
    name: 'BT Caterpillar Killer',
    category: 'Biological',
    price: 2600,
    rating: 4.7,
    description: 'Targets caterpillars and worms without harming beneficial insects',
    inStock: true,
  },
  {
    id: '4',
    name: 'Diatomaceous Earth 10lb',
    category: 'Organic',
    price: 2400,
    rating: 4.6,
    description: 'Natural powder for crawling insect control',
    inStock: true,
  },
  {
    id: '5',
    name: 'Pyrethrin Concentrate',
    category: 'Botanical',
    price: 3200,
    rating: 4.4,
    description: 'Fast-acting botanical insecticide for broad spectrum control',
    inStock: false,
  },
  {
    id: '6',
    name: 'Spinosad Garden Spray',
    category: 'Organic',
    price: 2200,
    rating: 4.8,
    description: 'OMRI listed organic solution for tough pests',
    inStock: true,
  },
  {
    id: '7',
    name: 'Beneficial Nematodes',
    category: 'Biological',
    price: 3600,
    rating: 4.5,
    description: 'Live microscopic organisms that control soil pests',
    inStock: true,
  },
  {
    id: '8',
    name: 'Copper Fungicide',
    category: 'Chemical',
    price: 1800,
    rating: 4.2,
    description: 'Prevents and controls fungal diseases on crops',
    inStock: true,
  },
  {
    id: '9',
    name: 'Horticultural Oil',
    category: 'Organic',
    price: 1600,
    rating: 4.4,
    description: 'Smothers soft-bodied pests and their eggs',
    inStock: true,
  },
];

export const PestStore: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [showCart, setShowCart] = useState<boolean>(false);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  const categories = ['All', ...Array.from(new Set(pestProducts.map((p) => p.category)))];

  const filteredProducts =
    selectedCategory === 'All'
      ? pestProducts
      : pestProducts.filter((p) => p.category === selectedCategory);

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };


  const getCartItems = () => {
    return Object.entries(cart).map(([productId, quantity]) => {
      const product = pestProducts.find(p => p.id === productId);
      return product ? { ...product, quantity } : null;
    }).filter(Boolean);
  };

  const getTotalPrice = () => {
    return getCartItems().reduce((total, item) => total + (item!.price * item!.quantity), 0);
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setCart({});
    setTimeout(() => {
      setOrderPlaced(false);
      setShowCart(false);
    }, 3000);
  };

  const cartItemCount = Object.values(cart).reduce((sum, count) => sum + count, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pest Control Store</h1>
            <p className="text-gray-600">Professional solutions for crop protection</p>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowCart(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-6 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                <Bug className="w-8 h-8 text-green-600" />
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {product.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>

            <div className="flex items-center mb-3">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-medium text-gray-700">{product.rating}</span>
              </div>
              <span
                className={`ml-auto text-sm font-medium ${
                  product.inStock ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
              <button
                onClick={() => addToCart(product.id)}
                disabled={!product.inStock}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              {getCartItems().length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400 text-sm">Add some products to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {getCartItems().map((item) => (
                    <div key={item!.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bug className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{item!.name}</h3>
                        <p className="text-sm text-gray-500">{item!.category}</p>
                        <p className="text-lg font-bold text-green-600">₹{item!.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(item!.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-500" />
                        </button>
                        <span className="w-8 text-center font-medium">{item!.quantity}</span>
                        <button
                          onClick={() => addToCart(item!.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">₹{item!.price * item!.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {getCartItems().length > 0 && (
              <div className="border-t p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-green-600">₹{getTotalPrice()}</span>
                </div>
                <button
                  onClick={placeOrder}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
                >
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Order Placed Success Modal */}
      {orderPlaced && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
            <p className="text-gray-600">Your order has been successfully placed. Thank you for your purchase!</p>
          </div>
        </div>
      )}
    </div>
  );
};
