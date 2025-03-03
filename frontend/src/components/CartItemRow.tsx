import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItemProps } from '../types';

const CartItemRow: React.FC<CartItemProps> = ({ 
  item, 
  updateQuantity, 
  removeFromCart 
}) => {
  const { product, quantity } = item;
  
  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-full overflow-hidden mr-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
        {product.customizations && (
          <div className="mt-1 text-xs text-gray-500">
            <span className="inline-block mr-2">Size: {product.customizations.size}</span>
            <span className="inline-block mr-2">Sugar: {product.customizations.sugar}</span>
            <span className="inline-block">Ice: {product.customizations.ice}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center">
        <button
          onClick={() => updateQuantity(product.id, quantity - 1)}
          className="p-1 text-gray-400 hover:text-gray-500"
        >
          <Minus className="h-5 w-5" />
        </button>
        
        <span className="mx-2 text-gray-700">{quantity}</span>
        
        <button
          onClick={() => updateQuantity(product.id, quantity + 1)}
          className="p-1 text-gray-400 hover:text-gray-500"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      
      <div className="ml-4 text-right">
        <p className="text-lg font-medium text-gray-900">
          ${(product.price * quantity).toFixed(2)}
        </p>
      </div>
      
      <button
        onClick={() => removeFromCart(product.id)}
        className="ml-4 text-red-500 hover:text-red-600"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CartItemRow;