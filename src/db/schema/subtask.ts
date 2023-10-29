import { relations, sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { sqliteTable } from "./noodle_table";
import { taskTable } from "./task";

export const subtask = sqliteTable("subtask", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),

  title: text("title").notNull(),

  notes: text("notes").notNull(),

  done: integer("done", { mode: "boolean" }).default(false),
  doneAt: text("doneAt"),

  taskId: integer("task_id")
    .references(() => taskTable.id)
    .notNull(),

  createdAt: text("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  updatedAt: text("updatedAt")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type Subtask = typeof subtask.$inferSelect;
export type NewSubtask = typeof subtask.$inferInsert;

export const subtaskRelations = relations(subtask, ({ one }) => ({
  task: one(taskTable),
}));

export const insertSubtaskSchema = createInsertSchema(subtask).omit({
  id: true,
  createdAt: true,
  done: true,
  doneAt: true,
});

export const updateSubtaskSchema = createInsertSchema(subtask).omit({
  moduleId: true,
  taskId: true,
  doneAt: true,
  createdAt: true,
});

export const selectSubtaskSchema = createSelectSchema(subtask).omit({
  createdAt: true,
  description: true,
  dueDate: true,
  priority: true,
  title: true,
  notes: true,
  doneAt: true,
  done: true,
});
