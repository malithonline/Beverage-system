import React from 'react';
import ProductCard from '../components/ProductCard';
import { MenuProps, Product } from '../types';

const smoothieProducts: Product[] = [
  {
    id: 'berry-blast-smoothie',
    name: 'Berry Blast Smoothie',
    description: 'A refreshing blend of mixed berries, yogurt, and honey.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a90a0868?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'tropical-paradise',
    name: 'Tropical Paradise',
    description: 'Mango, pineapple, and banana blended with coconut milk.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'green-goodness',
    name: 'Green Goodness',
    description: 'Spinach, kale, apple, and banana with a hint of ginger.',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'banana-protein',
    name: 'Banana Protein',
    description: 'Banana, peanut butter, protein powder, and almond milk.',
    price: 7.95,
    image: 'https://images.unsplash.com/photo-1553787499-6f9133242821?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  }
];

const SmoothieMenu: React.FC<MenuProps> = ({ addToCart }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Smoothie</h2>
      <div className="grid grid-cols-1 gap-6">
        {smoothieProducts.map((product) => (
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

export default SmoothieMenu;