const products = [
  // Coffee products
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'A concentrated form of coffee served in small, strong shots.',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    category: 'coffee'
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk foam, perfect balance of coffee and milk.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    category: 'coffee'
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Espresso with steamed milk and a light layer of foam on top.',
    price: 4.75,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    category: 'coffee'
  },
  {
    id: 'mocha',
    name: 'Mocha',
    description: 'A chocolate-flavored variant of a latte, combining espresso, milk and chocolate.',
    price: 5.25,
    image: 'https://images.unsplash.com/photo-1579888071069-c107a6f79d82?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    category: 'coffee'
  },
  {
    id: 'americano',
    name: 'Americano',
    description: 'Espresso diluted with hot water, similar strength to regular coffee.',
    price: 3.75,
    image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    category: 'coffee'
  },
  
  // Tea products
  {
    id: 'green-black-tea',
    name: 'Green Black Tea',
    description: 'A refreshing blend of green and black tea leaves.',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    category: 'tea'
  },
  {
    id: 'jasmine-tea',
    name: 'Jasmine Tea',
    description: 'Green tea scented with jasmine flowers for a fragrant flavor.',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    category: 'tea'
  },
  {
    id: 'chai-latte',
    name: 'Chai Latte',
    description: 'Spiced black tea mixed with steamed milk and honey.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    category: 'tea'
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    description: 'Premium matcha green tea powder whisked with steamed milk.',
    price: 4.95,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    category: 'tea'
  },
  
  // Smoothie products
  {
    id: 'berry-blast-smoothie',
    name: 'Berry Blast Smoothie',
    description: 'A refreshing blend of mixed berries, yogurt, and honey.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a90a0868?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    category: 'smoothie'
  },
  {
    id: 'tropical-paradise',
    name: 'Tropical Paradise',
    description: 'Mango, pineapple, and banana blended with coconut milk.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    category: 'smoothie'
  },
  {
    id: 'green-goodness',
    name: 'Green Goodness',
    description: 'Spinach, kale, apple, and banana with a hint of ginger.',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    category: 'smoothie'
  },
  {
    id: 'banana-protein',
    name: 'Banana Protein',
    description: 'Banana, peanut butter, protein powder, and almond milk.',
    price: 7.95,
    image: 'https://images.unsplash.com/photo-1553787499-6f9133242821?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    category: 'smoothie'
  },
  
  // Bubble Tea products
  {
    id: 'classic-bubble-tea',
    name: 'Classic Bubble Tea',
    description: 'Black tea with milk and tapioca pearls.',
    price: 5.75,
    image: 'https://images.unsplash.com/photo-1558857563-c0c3acb72526?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    category: 'bubbleTea'
  },
  {
    id: 'taro-bubble-tea',
    name: 'Taro Bubble Tea',
    description: 'Creamy taro-flavored milk tea with tapioca pearls.',
    price: 5.95,
    image: 'https://images.unsplash.com/photo-1581849971860-3f8795d586c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    category: 'bubbleTea'
  },
  {
    id: 'thai-bubble-tea',
    name: 'Thai Bubble Tea',
    description: 'Strong Thai tea with condensed milk and tapioca pearls.',
    price: 5.95,
    image: 'https://images.unsplash.com/photo-1546549095-8d9cb7bcb87e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    category: 'bubbleTea'
  },
  {
    id: 'brown-sugar-milk-tea',
    name: 'Brown Sugar Milk Tea',
    description: 'Milk tea with brown sugar syrup and tapioca pearls.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1627998792088-f8016b438988?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    category: 'bubbleTea'
  }
];

export default products;