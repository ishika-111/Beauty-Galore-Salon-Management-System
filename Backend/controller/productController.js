import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import multer from "multer";

const prisma = new PrismaClient();

// Set up multer storage for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir); // Ensure the 'uploads' folder exists
    }
    cb(null, dir); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename
  },
});

const upload = multer({ storage }); // Configure multer with the storage settings

// Middleware for handling file uploads
const uploadImage = upload.single("image"); // Use 'image' field name for the file

// Middleware to check if the user is an admin
const isAdmin = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return false;

  try {
    const decoded = jwt.verify(token, "casdkjfqheiru23");
    return decoded.user.role === "ADMIN";
  } catch (error) {
    return false;
  }
};

// Create a new product item (Admin only)
const createProductItem = async (req, res) => {
  if (!req.adminId) {
    return res.status(403).json({ message: "Access denied" });
  }

  uploadImage(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Image upload failed", error: err.message });
    }

    // Debug: Log incoming request data
    console.log("Request Body:", req.body); // Log form data
    console.log("Uploaded File:", req.file); // Log file details

    const { name, description, price, category, stock } = req.body;

    // Convert price to Float
    const priceFloat = parseFloat(price);
    const stockInt = parseInt(stock); // <-- Convert stock to integer

    // Check if the price is valid
    if (isNaN(priceFloat)) {
      return res.status(400).json({ message: "Invalid price value" });
    }

    if (isNaN(stockInt) || stockInt < 0) {
      return res.status(400).json({ message: "Invalid stock value" });
    }
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Get the image URL

    try {
      const productItem = await prisma.product.create({
        data: {
          name,
          description,
          price: priceFloat,
          imageUrl,
          category,
          stock: stockInt,
        },
      });

      res.status(201).json({ message: "Product item created", productItem });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating product item", error: error.message });
    }
  });
};

// Update a product item (Admin only)
const updateProductItem = async (req, res) => {
  if (!req.adminId) {
    return res.status(403).json({ message: "Access denied" });
  }

  uploadImage(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Image upload failed", error: err.message });
    }

    const { id } = req.params;
    const { name, description, price, available, stock, category } = req.body;

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`; // Save the new image URL
    }

    try {
      const updatedProductItem = await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          price: parseFloat(price),
          stock: parseInt(stock), // Ensure price is a float
          category,
          available: available === "true", // Convert to boolean
          ...(imageUrl && { imageUrl }), // Update image only if a new one is uploaded
        },
      });

      res.json({ message: "Product item updated", updatedProductItem });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating product item", error: error.message });
    }
  });
};

// Get all product items
const getProductItems = async (req, res) => {
  try {
    const productItems = await prisma.product.findMany();
    res.status(200).json(productItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product items", error: error.message });
  }
};

// Delete a product item (Admin only)
const deleteProductItem = async (req, res) => {
  if (!req.adminId) {
    return res.status(403).json({ message: "Access denied" });
  }

  const { id } = req.params;

  try {
    await prisma.product.delete({ where: { id } });
    res.json({ message: "Product item deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product item", error: error.message });
  }
};

export {
  createProductItem,
  getProductItems,
  updateProductItem,
  deleteProductItem,
  uploadImage,
};
