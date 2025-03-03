import React from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import CartItemRow from '../components/CartItemRow';
import { CartProps } from '../types';

const Cart: React.FC<CartProps> = ({ 
  cart, 
  updateQuantity, 
  removeFromCart, 
  getTotalPrice,
  handleCheckout,
  handleContinueShopping,
  specialInstructions,
  onSpecialInstructionsChange
}) => {
  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Cart</h2>
        <ShoppingCart className="h-6 w-6 text-orange-500" />
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <button
            onClick={handleContinueShopping}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <CartItemRow
                key={`${item.product.id}-${JSON.stringify(item.product.customizations)}`}
                item={item}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          <div className="mt-6">
            <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions
            </label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              rows={3}
              value={specialInstructions}
              onChange={(e) => onSpecialInstructionsChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Any special requests for your order? (e.g., allergies, preferences)"
            />
          </div>

          <div className="mt-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-900 font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-medium mt-4 pt-4 border-t border-gray-200">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={handleContinueShopping}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </button>
            
            <button
              onClick={handleCheckout}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;