import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const category = req.query.category;
    const query = category ? { category } : {};
    
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Staff
const createProduct = async (req, res) => {
  try {
    const { id, name, description, price, image, category } = req.body;

    const productExists = await Product.findOne({ id });

    if (productExists) {
      return res.status(400).json({ message: 'Product with this ID already exists' });
    }

    const product = await Product.create({
      id,
      name,
      description,
      price,
      image,
      category
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getProducts, getProductById, createProduct };