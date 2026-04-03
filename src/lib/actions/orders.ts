"use server";

import { db } from "@/lib/db";
import { orders, orderItems, products } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { createDeliveryOrder } from "@/lib/ecotrack";
import type { CartItem } from "@/lib/cart-context";
import { requireAdmin } from "./auth-guard";

/* ────────────────────────────────────────────── */
/*  Types                                         */
/* ────────────────────────────────────────────── */

export type CreateOrderInput = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  wilaya?: string;
  wilayaCode?: string;
  commune?: string;
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
  wilaya: string;
  wilayaCode: string;
  commune: string;
  ecotrackTracking: string;
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
      wilaya: input.wilaya ?? "",
      wilayaCode: input.wilayaCode ?? "",
      commune: input.commune ?? "",
      notes: input.notes,
      total,
      status: "new",
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

  // Send to EcoTrack for delivery
  try {
    const productNames = input.items.map((i) => i.name).join(", ");
    const totalQty = input.items.reduce((s, i) => s + i.quantity, 0);

    const tracking = await createDeliveryOrder({
      reference: orderNumber,
      nom_client: input.customerName,
      telephone: input.customerPhone,
      adresse: input.address,
      commune: input.commune ?? "",
      code_wilaya: input.wilayaCode ?? "",
      montant: String(total),
      remarque: input.notes || "",
      produit: productNames,
      quantite: String(totalQty),
    });

    if (tracking) {
      await db
        .update(orders)
        .set({ ecotrackTracking: tracking })
        .where(eq(orders.id, order.id));
    }
  } catch (err) {
    // Log but don't fail the order if EcoTrack is unavailable
    console.error("[EcoTrack] Failed to create delivery order:", err);
  }

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
  await requireAdmin();
  await db.update(orders).set({ status }).where(eq(orders.id, orderId));
}

/* ────────────────────────────────────────────── */
/*  Best Sellers (top 4 most ordered products)    */
/* ────────────────────────────────────────────── */

export async function getBestSellers(limit = 4) {
  const rows = await db
    .select({
      productId: orderItems.productId,
      totalQty: sql<number>`sum(${orderItems.quantity})`,
    })
    .from(orderItems)
    .groupBy(orderItems.productId)
    .orderBy(sql`sum(${orderItems.quantity}) desc`)
    .limit(limit);

  if (rows.length === 0) return [];

  const productIds = rows.map((r) => r.productId);
  const prods = await db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      image: products.image,
      slug: sql<string>`concat('product/', ${products.id})`,
    })
    .from(products)
    .where(sql`${products.id} in ${productIds}`);

  // Preserve order by totalQty
  return productIds
    .map((id) => prods.find((p) => p.id === id))
    .filter(Boolean) as typeof prods;
}
