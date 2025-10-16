import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};

export const roleEnum = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("User", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  role: roleEnum("role").notNull().default("USER"),
  ...timestamps,
});

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
