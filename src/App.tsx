import React, { useState, useEffect } from 'react';
import { Coffee, Milk, CupSoda, ShoppingCart, CreditCard, Check } from 'lucide-react';
import Navbar from './components/Navbar';
import CoffeeMenu from './pages/CoffeeMenu';
import SmoothieMenu from './pages/SmoothieMenu';
import TeaMenu from './pages/TeaMenu';
import BubbleTeaMenu from './pages/BubbleTeaMenu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';
import Login from './pages/Login';
import StaffDashboard from './pages/staff/StaffDashboard';
import { CartItem, Product, Order, User } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('coffee');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState('login'); // login, menu, cart, checkout, thankyou, staff-dashboard
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      // Set appropriate starting page based on user role
      if (JSON.parse(savedUser).role === 'staff') {
        setCurrentPage('staff-dashboard');
      } else {
        setCurrentPage('menu');
      }
    }

    // Load sample orders
    const sampleOrders = [
      {
        id: '1',
        items: [
          {
            product: {
              id: 'espresso',
              name: 'Espresso',
              description: 'A concentrated form of coffee served in small, strong shots.',
              price: 3.50,
              image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
              customizations: {
                size: 'Regular',
                sugar: 'Normal',
                ice: 'No Ice'
              }
            },
            quantity: 1
          }
        ],
        customerName: 'John Doe',
        status: 'pending',
        timestamp: new Date().toISOString(),
        specialInstructions: 'Extra hot, please.'
      },
      {
        id: '2',
        items: [
          {
            product: {
              id: 'cappuccino',
              name: 'Cappuccino',
              description: 'Espresso with steamed milk foam, perfect balance of coffee and milk.',
              price: 4.50,
              image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
              customizations: {
                size: 'Large',
                sugar: 'Less Sugar',
                ice: 'Normal'
              }
            },
            quantity: 1
          },
          {
            product: {
              id: 'latte',
              name: 'Latte',
              description: 'Espresso with steamed milk and a light layer of foam on top.',
              price: 4.75,
              image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
              customizations: {
                size: 'Regular',
                sugar: 'Normal',
                ice: 'Less Ice'
              }
            },
            quantity: 2
          }
        ],
        customerName: 'Jane Smith',
        status: 'in-progress',
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        specialInstructions: 'Almond milk for the latte, please.'
      },
      {
        id: '3',
        items: [
          {
            product: {
              id: 'mocha',
              name: 'Mocha',
              description: 'A chocolate-flavored variant of a latte, combining espresso, milk and chocolate.',
              price: 5.25,
              image: 'https://images.unsplash.com/photo-1579888071069-c107a6f79d82?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
              customizations: {
                size: 'Large',
                sugar: 'Extra Sugar',
                ice: 'No Ice'
              }
            },
            quantity: 1
          }
        ],
        customerName: 'Mike Johnson',
        status: 'completed',
        timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
        specialInstructions: 'Extra chocolate, please.'
      }
    ];
    setOrders(sampleOrders);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      // For customized products, we need to check if the exact same customization exists
      const existingItemIndex = prevCart.findIndex(item => {
        if (item.product.id !== product.id) return false;
        
        // If product has customizations, check if they match
        if (product.customizations) {
          if (!item.product.customizations) return false;
          
          return (
            item.product.customizations.size === product.customizations.size &&
            item.product.customizations.sugar === product.customizations.sugar &&
            item.product.customizations.ice === product.customizations.ice
          );
        }
        
        // If no customizations, just check the product id
        return !item.product.customizations;
      });
      
      if (existingItemIndex !== -1) {
        // Update quantity of existing item with same customizations
        return prevCart.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add as new item
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
  };

  const handleCompleteOrder = () => {
    // Add the current cart as a new order
    if (cart.length > 0) {
      const newOrder: Order = {
        id: (orders.length + 1).toString(),
        items: [...cart],
        customerName: user?.name || 'Guest',
        status: 'pending',
        timestamp: new Date().toISOString(),
        specialInstructions: ''
      };
      
      setOrders(prevOrders => [...prevOrders, newOrder]);
    }
    
    setCurrentPage('thankyou');
    clearCart();
  };

  const handleContinueShopping = () => {
    setCurrentPage('menu');
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (loggedInUser.role === 'customer') {
      setCurrentPage('menu');
    } else if (loggedInUser.role === 'staff') {
      setCurrentPage('staff-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  const updateOrderStatus = (orderId: string, status: 'pending' | 'in-progress' | 'completed') => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status } 
          : order
      )
    );
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'menu':
        switch (activeTab) {
          case 'coffee':
            return <CoffeeMenu addToCart={addToCart} />;
          case 'smoothie':
            return <SmoothieMenu addToCart={addToCart} />;
          case 'tea':
            return <TeaMenu addToCart={addToCart} />;
          case 'bubbleTea':
            return <BubbleTeaMenu addToCart={addToCart} />;
          default:
            return <CoffeeMenu addToCart={addToCart} />;
        }
      case 'cart':
        return (
          <Cart 
            cart={cart} 
            updateQuantity={updateQuantity} 
            removeFromCart={removeFromCart} 
            getTotalPrice={getTotalPrice}
            handleCheckout={handleCheckout}
            handleContinueShopping={handleContinueShopping}
          />
        );
      case 'checkout':
        return (
          <Checkout 
            cart={cart} 
            getTotalPrice={getTotalPrice}
            handleCompleteOrder={handleCompleteOrder}
          />
        );
      case 'thankyou':
        return <ThankYou handleContinueShopping={handleContinueShopping} />;
      case 'staff-dashboard':
        return (
          <StaffDashboard 
            orders={orders} 
            updateOrderStatus={updateOrderStatus} 
          />
        );
      default:
        return <CoffeeMenu addToCart={addToCart} />;
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Coffee className="h-5 w-5 text-white" />
                </div>
              </div>
              <h1 className="ml-2 text-xl font-bold text-gray-900">Cafe Asipiya</h1>
            </div>
            <div className="flex items-center">
              {user && (
                <div className="mr-4 text-sm text-gray-600">
                  {user.name} ({user.role})
                </div>
              )}
              
              {user && (
                <button 
                  onClick={handleLogout}
                  className="text-sm text-orange-500 hover:text-orange-600 mr-4"
                >
                  Logout
                </button>
              )}
              
              {currentPage === 'menu' && (
                <button 
                  onClick={() => setCurrentPage('cart')}
                  className="relative p-2 text-orange-500 hover:text-orange-600"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {getTotalItems() > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-orange-500 rounded-full">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {currentPage === 'menu' && (
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;