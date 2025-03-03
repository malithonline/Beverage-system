import React, { useState } from 'react';
import { Coffee, User, ChefHat } from 'lucide-react';
import { LoginProps } from '../types';
import { loginUser, registerUser } from '../api';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<'customer' | 'staff'>('customer');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (mode === 'register' && !name) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }

    try {
      if (activeTab === 'staff') {
        // Staff login
        if (email === 'staff@cafe.com' && password === 'staff123') {
          onLogin({
            id: '1',
            name: 'Staff Member',
            email: 'staff@cafe.com',
            role: 'staff'
          });
        } else {
          const userData = await loginUser(email, password);
          if (userData.role === 'staff') {
            onLogin(userData);
          } else {
            setError('Invalid staff credentials');
          }
        }
      } else {
        // Customer login or register
        if (mode === 'login') {
          const userData = await loginUser(email, password);
          onLogin(userData);
        } else {
          // Register
          const userData = await registerUser(name, email, password);
          onLogin(userData);
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError(mode === 'login' 
        ? 'Invalid email or password' 
        : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-orange-500 py-6">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center">
            <Coffee className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-2xl font-bold text-white">Cafe Asipiya</h2>
      </div>

      <div className="p-6">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('customer')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'customer'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center">
              <User className="h-5 w-5 mr-2" />
              Customer
            </div>
          </button>
          <button
            onClick={() => setActiveTab('staff')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'staff'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center">
              <ChefHat className="h-5 w-5 mr-2" />
              Staff
            </div>
          </button>
        </div>

        {activeTab === 'customer' && (
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-center text-sm font-medium ${
                mode === 'login'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 text-center text-sm font-medium ${
                mode === 'register'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Register
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {(activeTab === 'customer' || mode === 'register') && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Your name"
                required={mode === 'register'}
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder={activeTab === 'staff' ? 'staff@cafe.com' : 'your@email.com'}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder={activeTab === 'staff' ? 'staff123' : '••••••'}
              required
            />
            {activeTab === 'staff' && (
              <p className="mt-1 text-xs text-gray-500">
                For demo: Use staff@cafe.com / staff123
              </p>
            )}
            {activeTab === 'customer' && mode === 'login' && (
              <p className="mt-1 text-xs text-gray-500">
                Demo accounts: malith@example.com, pasindu@example.com, kavindu@example.com (password: 123456)
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70"
          >
            {loading ? 'Please wait...' : (
              activeTab === 'customer' 
                ? (mode === 'login' ? 'Login' : 'Register') 
                : 'Login as Staff'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;