import React, { useState } from 'react';
import { ProductCardProps } from '../types';

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({
    size: 'Regular',
    sugar: 'Normal',
    ice: 'Normal'
  });

  const handleCustomize = () => {
    setShowCustomizeModal(true);
  };

  const handleCloseModal = () => {
    setShowCustomizeModal(false);
  };

  const handleAddToCart = () => {
    // Add customized product to cart
    const customizedProduct = {
      ...product,
      customizations: selectedOptions
    };
    addToCart(customizedProduct, quantity);
    setShowCustomizeModal(false);
    // Reset options for next time
    setQuantity(1);
    setSelectedOptions({
      size: 'Regular',
      sugar: 'Normal',
      ice: 'Normal'
    });
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 flex items-start">
        <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-full overflow-hidden mr-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{product.name} - ${product.price.toFixed(2)}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.description}</p>
        </div>
      </div>
      <div className="px-4 pb-4 flex justify-end">
        <button
          onClick={handleCustomize}
          className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Customize
        </button>
      </div>

      {/* Customize Modal */}
      {showCustomizeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="h-32 w-32 object-cover rounded-full mx-auto"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                  Size
                </label>
                <select
                  id="size"
                  name="size"
                  value={selectedOptions.size}
                  onChange={handleOptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="Small">Small</option>
                  <option value="Regular">Regular</option>
                  <option value="Large">Large</option>
                </select>
              </div>

              <div>
                <label htmlFor="sugar" className="block text-sm font-medium text-gray-700 mb-1">
                  Sugar Level
                </label>
                <select
                  id="sugar"
                  name="sugar"
                  value={selectedOptions.sugar}
                  onChange={handleOptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="No Sugar">No Sugar</option>
                  <option value="Less Sugar">Less Sugar</option>
                  <option value="Normal">Normal</option>
                  <option value="Extra Sugar">Extra Sugar</option>
                </select>
              </div>

              <div>
                <label htmlFor="ice" className="block text-sm font-medium text-gray-700 mb-1">
                  Ice Level
                </label>
                <select
                  id="ice"
                  name="ice"
                  value={selectedOptions.ice}
                  onChange={handleOptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="No Ice">No Ice</option>
                  <option value="Less Ice">Less Ice</option>
                  <option value="Normal">Normal</option>
                  <option value="Extra Ice">Extra Ice</option>
                </select>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="p-2 w-16 text-center border-t border-b border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;