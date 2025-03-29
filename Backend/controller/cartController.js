import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Add to Cart
 */
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User not logged in" });
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
      where: { userId_productId: { userId, productId } },
      update: { quantity: { increment: quantity } },
      create: { userId, productId, quantity },
    });

    res.status(200).json(cartItem);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

/**
 * Get user's cart items
 */
export const getCart = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User not logged in" });
  }

  try {
    const cart = await prisma.cart.findMany({
      where: { userId },
      include: { product: true }, // Ensures cart includes product details
    });

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (req, res) => {
  const { cartItemId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User not logged in" });
  }

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
