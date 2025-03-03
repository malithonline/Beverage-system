import React from 'react';
import ProductCard from '../components/ProductCard';
import { MenuProps, Product } from '../types';

const teaProducts: Product[] = [
  {
    id: 'green-black-tea',
    name: 'Green Black Tea',
    description: 'A refreshing blend of green and black tea leaves.',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'jasmine-tea',
    name: 'Jasmine Tea',
    description: 'Green tea scented with jasmine flowers for a fragrant flavor.',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'chai-latte',
    name: 'Chai Latte',
    description: 'Spiced black tea mixed with steamed milk and honey.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    description: 'Premium matcha green tea powder whisked with steamed milk.',
    price: 4.95,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  }
];

const TeaMenu: React.FC<MenuProps> = ({ addToCart }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tea</h2>
      <div className="grid grid-cols-1 gap-6">
        {teaProducts.map((product) => (
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

export default TeaMenu;