import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  timestamp,
  integer,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};

export const roleEnum = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    clerkId: text("clerk_id").unique().notNull(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    imageUrl: text("image_url").notNull(),
    role: roleEnum("role").notNull().default("USER"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("clerk_id_idx").on(t.clerkId)]
);

export const posts = pgTable("Post", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  published: boolean("published").notNull().default(false),
  authorId: integer("authorId")
    .notNull()
    .references(() => users.id),
  ...timestamps,
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
