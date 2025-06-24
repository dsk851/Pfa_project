import { json } from 'drizzle-orm/gel-core';
import { pgTable, serial, varchar, integer, decimal, text} from 'drizzle-orm/pg-core';

export const CarListing = pgTable('car_listing', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  tagline: varchar('tagline', { length: 255 }),
  original_price: decimal('original_price', { precision: 10, scale: 2 }),
  selling_price: decimal('selling_price', { precision: 10, scale: 2 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  condition: varchar('condition', { length: 50 }).notNull(),
  make: varchar('make', { length: 50 }).notNull(),
  model: varchar('model', { length: 255 }).notNull(),
  year: integer('year').notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  vin: varchar('vin', { length: 50 }).notNull(),
  drive_type: varchar('drive_type', { length: 50 }).notNull(),
  fuel_type: varchar('fuel_type', { length: 50 }).notNull(),
  transmission: varchar('transmission', { length: 50 }).notNull(),
  mileage: integer('mileage').notNull(),
  engine_size: varchar('engine_size', { length: 100 }),
  cylinder: integer('cylinder'),
  color: varchar('color', { length: 50 }).notNull(),
  doors: integer('doors').notNull(),
  offer_type: varchar('offer_type', { length: 50 }).notNull(),
  description: text('description').notNull(),
  features: json('features'),
  createdBy: varchar('createdBy').notNull(),
  username:varchar('username').notNull(),
  createdAt: varchar('createdAt').notNull().default('Takashi'),
  userImageUrl: varchar('userImageUrl').notNull().default('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
  updatedAt: varchar('updatedAt').notNull(),

});

export const CarImages = pgTable('car_images', {
  id:serial('id').primaryKey(),
  imageUrl:varchar('imageUrl').notNull(),
  carListingId:integer('carListingId').notNull().references(()=>CarListing.id, {onDelete: 'cascade'}),
})
