import React from 'react';
import ProductCard from '../components/ProductCard';
import { MenuProps, Product } from '../types';

const bubbleTeaProducts: Product[] = [
  {
    id: 'classic-bubble-tea',
    name: 'Classic Bubble Tea',
    description: 'Black tea with milk and tapioca pearls.',
    price: 5.75,
    image: 'https://images.unsplash.com/photo-1558857563-c0c3acb72526?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'taro-bubble-tea',
    name: 'Taro Bubble Tea',
    description: 'Creamy taro-flavored milk tea with tapioca pearls.',
    price: 5.95,
    image: 'https://images.unsplash.com/photo-1581849971860-3f8795d586c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'thai-bubble-tea',
    name: 'Thai Bubble Tea',
    description: 'Strong Thai tea with condensed milk and tapioca pearls.',
    price: 5.95,
    image: 'https://images.unsplash.com/photo-1546549095-8d9cb7bcb87e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'brown-sugar-milk-tea',
    name: 'Brown Sugar Milk Tea',
    description: 'Milk tea with brown sugar syrup and tapioca pearls.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1627998792088-f8016b438988?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  }
];

const BubbleTeaMenu: React.FC<MenuProps> = ({ addToCart }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Bubble Tea</h2>
      <div className="grid grid-cols-1 gap-6">
        {bubbleTeaProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default BubbleTeaMenu;