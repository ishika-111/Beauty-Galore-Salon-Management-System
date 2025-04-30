import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Add item to cart
 */
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user?.id;

  if (!productId || quantity < 1) {
    return res.status(400).json({
      error:
        "Invalid input: productId and quantity must be provided and quantity must be at least 1",
    });
  }

  try {
    // Check if the product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Add or update cart item
    const cartItem = await prisma.cart.upsert({
      where: { userId_productId: { userId, productId } }, // Composite key
      update: { quantity: { increment: quantity } },
      create: { userId, productId, quantity },
    });

    res.json(cartItem);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Update item in cart
 */
export const updateCartItem = async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;
  const userId = req.user?.id;

  if (quantity < 1) {
    return res.status(400).json({ error: "Quantity must be at least 1" });
  }

  try {
    // Find the cart item
    const cartItem = await prisma.cart.findUnique({
      where: { id: parseInt(cartItemId) },
      include: { product: true }, // <-- Include product info
    });

    if (!cartItem || cartItem.userId !== userId) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Check stock availability
    if (quantity > cartItem.product.stock) {
      return res
        .status(400)
        .json({ error: "Quantity exceeds available stock" });
    }

    // Update the quantity
    const updatedCartItem = await prisma.cart.update({
      where: { id: parseInt(cartItemId) },
      data: { quantity },
    });

    res.json(updatedCartItem);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Get user's cart items
 */
export const getCart = async (req, res) => {
  const userId = req.user?.id;

  try {
    const cart = await prisma.cart.findMany({
      where: { userId },
      include: { product: true }, // Fetch product details
    });

    if (cart.length === 0) {
      return res.status(404).json({ message: "Your cart is empty" });
    }

    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (req, res) => {
  const { cartItemId } = req.params;
  const userId = req.user?.id;

  try {
    // Find cart item
    const cartItem = await prisma.cart.findUnique({
      where: { id: parseInt(cartItemId) },
    });

    if (!cartItem || cartItem.userId !== userId) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Delete cart item
    await prisma.cart.delete({ where: { id: parseInt(cartItemId) } });

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
