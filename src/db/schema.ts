import { pgTable, serial, text, integer, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";

// Members — membership sign-ups and inquiries
export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  plan: text("plan").notNull(),              // Starter, Pro, Transformation
  branch: text("branch").notNull(),          // Begampur, Trichy Bypass, Palani Road
  fitnessGoal: text("fitness_goal"),         // Muscle Gain, Weight Loss, Strength, etc.
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Enquiries — contact form submissions
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  preferredBranch: text("preferred_branch"), // Begampur, Trichy Bypass, Palani Road
  preferredTime: text("preferred_time"),     // Morning, Evening, Any
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Trainers — trainer profiles
export const trainers = pgTable("trainers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  experience: integer("experience").notNull(), // years
  bio: text("bio").notNull(),
  imageUrl: text("image_url").notNull(),
  certifications: text("certifications"),
  branch: text("branch"),
  socialLinks: jsonb("social_links"),          // Instagram, Facebook, etc.
});

// Programs — classes/programs
export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  schedule: text("schedule").notNull(),
  icon: text("icon").notNull(),
});

// Testimonials — member reviews and success stories
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  quote: text("quote").notNull(),
  rating: integer("rating").notNull(),         // 1-5
  imageUrl: text("image_url").notNull(),
  goal: text("goal"),
  result: text("result"),
});

// Branches — location information
export const branches = pgTable("branches", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  phone: jsonb("phone").notNull(),             // array of phone numbers
  coordinates: jsonb("coordinates").notNull(), // { lat, lng }
  hours: jsonb("hours").notNull(),             // opening/closing times
  amenities: jsonb("amenities").notNull(),     // array of amenities
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  reviews: integer("reviews").notNull(),
});

// Leads — lead tracking and scoring for dashboard
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  source: text("source").default("direct").notNull(),      // organic, google_ads, social, referral, direct
  leadScore: integer("lead_score").default(10).notNull(), // 0-100 based on engagement
  status: text("status").default("new").notNull(),        // new, contacted, qualified, converted, lost
  notes: text("notes"),
  lastContactedAt: timestamp("last_contacted_at"),
  convertedAt: timestamp("converted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
