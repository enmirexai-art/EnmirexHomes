import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  propertyAddress: text("property_address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  propertyType: text("property_type"),
  bedrooms: text("bedrooms"),
  bathrooms: text("bathrooms"),
  squareFootage: text("square_footage"),
  propertyCondition: text("property_condition"),
  sellingReason: text("selling_reason"),
  fullName: text("full_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  email: text("email").notNull(),
  additionalDetails: text("additional_details"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
