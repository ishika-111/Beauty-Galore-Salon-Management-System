import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address, paymentMethod, orderType } = req.body;

    // Validate input
    if (!address || !paymentMethod || !orderType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Fetch or update customer address
    let customer = await prisma.customer.findUnique({ where: { userId } });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    customer = await prisma.customer.update({
      where: { userId },
      data: { address },
    });

    // Get cart items
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });

    if (!cartItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Fixed delivery charge for all orders within Pokhara Valley
    const deliveryCharge = 150;

    // Calculate total amount
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    // Create the order in the database
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount:
          totalAmount + (orderType === "DELIVERY" ? deliveryCharge : 0),
        paymentMethod,
        address,
        orderType,
        status: "PENDING",
        deliveryCharge: orderType === "DELIVERY" ? deliveryCharge : 0,
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: { items: true },
    });

    // Clear cart after order placement
    await prisma.cart.deleteMany({ where: { userId } });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

// --------------------- GET ALL ORDERS (ADMIN) ---------------------
export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ message: "Failed to retrieve orders" });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "PENDING",
      "CONFIRMED",
      "PREPARING",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "CANCELLED",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const updated = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: { status },
    });

    res.status(200).json({ message: "Order status updated", order: updated });
  } catch (error) {
    console.error("❌ Update Order Status Error:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

export const getCustomerOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("❌ Get Customer Orders Error:", error);
    res.status(500).json({ message: "Failed to fetch customer orders" });
  }
};

export const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user?.id;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // ✅ Only allow cancellation if orderType is "COD" and paymentMethod is "CASH"
    if (order.orderType !== "PICKUP" || order.paymentMethod !== "CARD") {
      return res.status(400).json({
        message: "Only COD orders with CASH payment can be canceled",
      });
    }

    // ✅ Only allow cancellation if status is PENDING
    if (order.status !== "PENDING") {
      return res.status(400).json({
        message: "Only pending orders can be canceled",
      });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: { status: "CANCELED" },
    });

    return res.status(200).json({
      message: "Order canceled successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Cancel Order Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
