"use server";

import { db } from "@/lib/db";
import { orders, orderItems } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import type { CartItem } from "@/lib/cart-context";

/* ────────────────────────────────────────────── */
/*  Types                                         */
/* ────────────────────────────────────────────── */

export type CreateOrderInput = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  notes: string;
  items: CartItem[];
};

export type OrderWithItems = {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  notes: string;
  total: number;
  status: string;
  createdAt: Date;
  items: {
    id: number;
    productId: number;
    productName: string;
    productImage: string;
    variant: string;
    quantity: number;
    price: number;
  }[];
};

/* ────────────────────────────────────────────── */
/*  Create Order                                  */
/* ────────────────────────────────────────────── */

export async function createOrder(input: CreateOrderInput): Promise<string> {
  const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")}`;

  const total = input.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Insert order
  const [order] = await db
    .insert(orders)
    .values({
      orderNumber,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail,
      address: input.address,
      notes: input.notes,
      total,
      status: "pending",
    })
    .returning({ id: orders.id });

  // Insert order items
  await db.insert(orderItems).values(
    input.items.map((item) => ({
      orderId: order.id,
      productId: item.id,
      productName: item.name,
      productImage: item.image,
      variant: item.variant,
      quantity: item.quantity,
      price: item.price,
    }))
  );

  return orderNumber;
}

/* ────────────────────────────────────────────── */
/*  Get All Orders (admin)                        */
/* ────────────────────────────────────────────── */

export async function getOrders(): Promise<OrderWithItems[]> {
  const rawOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt));

  const result: OrderWithItems[] = [];

  for (const order of rawOrders) {
    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id));

    result.push({
      ...order,
      items: items.map((item) => ({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        productImage: item.productImage,
        variant: item.variant,
        quantity: item.quantity,
        price: item.price,
      })),
    });
  }

  return result;
}

/* ────────────────────────────────────────────── */
/*  Get Single Order by Order Number              */
/* ────────────────────────────────────────────── */

export async function getOrderByNumber(
  orderNumber: string
): Promise<OrderWithItems | null> {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.orderNumber, orderNumber))
    .limit(1);

  if (!order) return null;

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, order.id));

  return {
    ...order,
    items: items.map((item) => ({
      id: item.id,
      productId: item.productId,
      productName: item.productName,
      productImage: item.productImage,
      variant: item.variant,
      quantity: item.quantity,
      price: item.price,
    })),
  };
}

/* ────────────────────────────────────────────── */
/*  Update Order Status (admin)                   */
/* ────────────────────────────────────────────── */

export async function updateOrderStatus(
  orderId: number,
  status: string
): Promise<void> {
  await db.update(orders).set({ status }).where(eq(orders.id, orderId));
}
