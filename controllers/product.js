const Product = require("../models/product");
const mongoose = require("mongoose");

// Controller for creating a product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      createdBy: req.user.id, // Ensure this field is set
    });

    const newProduct = await product.save();
    res
      .status(201)
      .json({ message: "Product created successfully!", data: newProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller for getting all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .json({ message: "Products fetched successfully!", data: products });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller for getting a product by ID
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product fetched successfully!", data: product });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller for updating a product by ID
const updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const updates = req.body;
    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true, // Ensure that updates are validated
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product updated successfully!", data: product });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller for deleting a product by ID
const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
