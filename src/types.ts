export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  customizations?: {
    size: string;
    sugar: string;
    ice: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerName: string;
  status: 'pending' | 'in-progress' | 'completed';
  timestamp: string;
  specialInstructions?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'staff';
}

export interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface MenuProps {
  addToCart: (product: Product, quantity?: number) => void;
}

export interface CartProps {
  cart: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  getTotalPrice: () => number;
  handleCheckout: () => void;
  handleContinueShopping: () => void;
}

export interface CheckoutProps {
  cart: CartItem[];
  getTotalPrice: () => number;
  handleCompleteOrder: () => void;
}

export interface ThankYouProps {
  handleContinueShopping: () => void;
}

export interface ProductCardProps {
  product: Product;
  addToCart: (product: Product, quantity?: number) => void;
}

export interface CartItemProps {
  item: CartItem;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

export interface LoginProps {
  onLogin: (user: User) => void;
}

export interface StaffDashboardProps {
  orders: Order[];
  updateOrderStatus: (orderId: string, status: 'pending' | 'in-progress' | 'completed') => void;
}

export interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
  updateOrderStatus: (orderId: string, status: 'pending' | 'in-progress' | 'completed') => void;
}

export interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: 'pending' | 'in-progress' | 'completed') => void;
}