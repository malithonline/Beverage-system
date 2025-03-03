import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

// Load env vars
dotenv.config();

// Connect to DB with increased timeout and better error handling
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    return false;
  }
};

// Import data
const importData = async () => {
  try {
    const connected = await connectDB();
    if (!connected) {
      console.error('Failed to connect to MongoDB. Exiting seeder.');
      process.exit(1);
    }

    // Clear existing data
    await Order.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log('Users imported');

    // Insert products
    await Product.insertMany(products);
    console.log('Products imported');

    console.log('Data imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete data
const destroyData = async () => {
  try {
    const connected = await connectDB();
    if (!connected) {
      console.error('Failed to connect to MongoDB. Exiting seeder.');
      process.exit(1);
    }

    await Order.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run script based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}