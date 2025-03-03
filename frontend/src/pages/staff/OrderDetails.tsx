import React from 'react';
import { X, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { OrderDetailsProps } from '../../types';

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onClose, updateOrderStatus }) => {
  const { id, items, customerName, status, timestamp, specialInstructions } = order;
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;
  
  const orderDate = new Date(timestamp);
  const formattedDate = orderDate.toLocaleDateString();
  const formattedTime = orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Order #{id} Details</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-sm font-medium text-gray-900">Customer: {customerName}</p>
              <p className="text-sm text-gray-500">{formattedDate} at {formattedTime}</p>
            </div>
            <div>
              {status === 'pending' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <Clock className="h-3 w-3 mr-1" />
                  Pending
                </span>
              )}
              {status === 'in-progress' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  In Progress
                </span>
              )}
              {status === 'completed' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </span>
              )}
            </div>
          </div>
          
          {specialInstructions && (
            <div className="mt-2 p-3 bg-white rounded border border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-1">Special Instructions:</p>
              <p className="text-sm text-gray-600">{specialInstructions}</p>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Order Items</h4>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.product.id} className="py-4 flex">
                  <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-full overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">{item.product.name}</h5>
                        <p className="mt-1 text-xs text-gray-500">{item.product.description}</p>
                        {item.product.customizations && (
                          <div className="mt-1 text-xs text-gray-500">
                            <span className="inline-block mr-2">Size: {item.product.customizations.size}</span>
                            <span className="inline-block mr-2">Sugar: {item.product.customizations.sugar}</span>
                            <span className="inline-block">Ice: {item.product.customizations.ice}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                        <p className="mt-1 text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
            <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Tax (8%)</span>
            <span className="text-gray-900 font-medium">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-medium mt-4 pt-4 border-t border-gray-200">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">${total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          {status === 'pending' && (
            <button
              onClick={() => updateOrderStatus(id, 'in-progress')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start Preparing
            </button>
          )}
          {status === 'in-progress' && (
            <button
              onClick={() => updateOrderStatus(id, 'completed')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Mark as Completed
            </button>
          )}
          <button
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;