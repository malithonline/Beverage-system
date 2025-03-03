import React from 'react';
import { Coffee, CupSoda, Milk, CupSoda as BubbleTeaIcon } from 'lucide-react';
import { NavbarProps } from '../types';

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'coffee', name: 'Coffee', icon: <Coffee className="h-5 w-5" /> },
    { id: 'smoothie', name: 'Smoothie', icon: <CupSoda className="h-5 w-5" /> },
    { id: 'tea', name: 'Tea', icon: <Milk className="h-5 w-5" /> },
    { id: 'bubbleTea', name: 'Bubble Tea', icon: <BubbleTeaIcon className="h-5 w-5" /> },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex justify-between w-full">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;