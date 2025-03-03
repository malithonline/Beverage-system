import React from 'react';
import ProductCard from '../components/ProductCard';
import { MenuProps, Product } from '../types';

const coffeeProducts: Product[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'A concentrated form of coffee served in small, strong shots.',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk foam, perfect balance of coffee and milk.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Espresso with steamed milk and a light layer of foam on top.',
    price: 4.75,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'mocha',
    name: 'Mocha',
    description: 'A chocolate-flavored variant of a latte, combining espresso, milk and chocolate.',
    price: 5.25,
    image: 'https://images.unsplash.com/photo-1579888071069-c107a6f79d82?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'americano',
    name: 'Americano',
    description: 'Espresso diluted with hot water, similar strength to regular coffee.',
    price: 3.75,
    image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  }
];

const CoffeeMenu: React.FC<MenuProps> = ({ addToCart }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Coffee</h2>
      <div className="grid grid-cols-1 gap-6">
        {coffeeProducts.map((product) => (
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

export default CoffeeMenu;