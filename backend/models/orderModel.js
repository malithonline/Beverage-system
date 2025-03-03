import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    customizations: {
      size: { type: String },
      sugar: { type: String },
      ice: { type: String }
    }
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow guest orders
  },
  customerName: {
    type: String,
    required: true
  },
  items: [orderItemSchema],
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  specialInstructions: {
    type: String,
    default: ''
  },
  totalPrice: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;