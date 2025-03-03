import React from 'react';
import { Clock, ArrowRight, CheckCircle, Eye } from 'lucide-react';
import { OrderCardProps } from '../../types';

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails, updateOrderStatus }) => {
  const { id, items, customerName, status, timestamp } = order;
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  const orderDate = new Date(timestamp);
  const formattedDate = orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  const getStatusBadge = () => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            In Progress
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </span>
        );
      default:
        return null;
    }
  };
  
  const getActionButton = () => {
    switch (status) {
      case 'pending':
        return (
          <button
            onClick={() => updateOrderStatus(id, 'in-progress')}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowRight className="h-3 w-3 mr-1" />
            Start Preparing
          </button>
        );
      case 'in-progress':
        return (
          <button
            onClick={() => updateOrderStatus(id, 'completed')}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Mark Completed
          </button>
        );
      case 'completed':
        return null;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-gray-900">Order #{id}</h3>
              <div className="ml-2">{getStatusBadge()}</div>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {formattedDate} • {customerName} • {totalItems} item{totalItems !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-medium text-gray-900">${totalPrice.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flow-root">
            <ul className="-my-4 divide-y divide-gray-200">
              {items.slice(0, 2).map((item) => (
                <li key={item.product.id} className="py-4 flex">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                    </div>
                    {item.product.customizations && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.product.customizations.size}, {item.product.customizations.sugar} sugar, {item.product.customizations.ice} ice
                      </p>
                    )}
                  </div>
                </li>
              ))}
              {items.length > 2 && (
                <li className="py-2">
                  <p className="text-xs text-gray-500 text-center">
                    +{items.length - 2} more item{items.length - 2 !== 1 ? 's' : ''}
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
        <button
          onClick={() => onViewDetails(order)}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          <Eye className="h-3 w-3 mr-1" />
          View Details
        </button>
        
        {getActionButton()}
      </div>
    </div>
  );
};

export default OrderCard;