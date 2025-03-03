import React, { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { StaffDashboardProps, Order } from '../../types';
import OrderDetails from './OrderDetails';
import OrderCard from './OrderCard';

const StaffDashboard: React.FC<StaffDashboardProps> = ({ orders, updateOrderStatus }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'in-progress' | 'completed'>('pending');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const filteredOrders = orders.filter(order => order.status === activeTab);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleCloseOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const handleUpdateStatus = (orderId: string, newStatus: 'pending' | 'in-progress' | 'completed') => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus
      });
    }
  };

  const getStatusBadge = (status: string) => {
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
            <AlertCircle className="h-3 w-3 mr-1" />
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Staff Dashboard</h2>
        <div className="flex space-x-2">
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString()} | {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === 'pending'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center justify-center">
            <Clock className="h-5 w-5 mr-2" />
            Pending
            <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {orders.filter(order => order.status === 'pending').length}
            </span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('in-progress')}
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === 'in-progress'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center justify-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            In Progress
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {orders.filter(order => order.status === 'in-progress').length}
            </span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === 'completed'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center justify-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Completed
            <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {orders.filter(order => order.status === 'completed').length}
            </span>
          </div>
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
            <Info className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
          <p className="mt-1 text-sm text-gray-500">
            There are no {activeTab} orders at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={handleViewOrder}
              updateOrderStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}

      {showOrderDetails && selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={handleCloseOrderDetails}
          updateOrderStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default StaffDashboard;