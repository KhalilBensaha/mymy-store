import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
  doublePrecision,
} from "drizzle-orm/pg-core";

/* ─── Admins ─── */
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ─── Categories ─── */
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description").notNull().default(""),
  image: text("image").notNull().default("/images/best1.jpg"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ─── Products ─── */
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }).notNull().default(""),
  price: integer("price").notNull(),
  image: text("image").notNull(),
  gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(),
  materials: jsonb("materials").$type<string[]>().notNull().default([]),
  badge: varchar("badge", { length: 100 }).default(""),
  description: text("description").notNull().default(""),
  story: text("story").notNull().default(""),
  specs: jsonb("specs")
    .$type<{ label: string; value: string }[]>()
    .notNull()
    .default([]),
  variants: jsonb("variants").$type<string[]>().notNull().default([]),
  ratingScore: doublePrecision("rating_score").notNull().default(0),
  ratingCount: integer("rating_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ─── Site Settings (key-value) ─── */
export const settings = pgTable("settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ─── Contact Messages ─── */
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).default(""),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

/* ─── Orders ─── */
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 50 }).notNull().unique(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 50 }).notNull(),
  customerEmail: varchar("customer_email", { length: 255 }).notNull().default(""),
  address: text("address").notNull(),
  notes: text("notes").notNull().default(""),
  total: integer("total").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ─── Order Items ─── */
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .references(() => orders.id)
    .notNull(),
  productId: integer("product_id")
    .references(() => products.id)
    .notNull(),
  productName: varchar("product_name", { length: 255 }).notNull(),
  productImage: text("product_image").notNull().default(""),
  variant: varchar("variant", { length: 100 }).notNull().default(""),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
});
