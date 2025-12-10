import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  real,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const projects = pgTable(
  "projects",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    repository: text("repository").notNull(),
    icon: text("icon"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("projects_userId_idx").on(table.userId)]
);

export const projectsRelations = relations(projects, ({ one }) => ({
  user: one(user, {
    fields: [projects.userId],
    references: [user.id],
  }),
}));

export const summaryStatusEnum = pgEnum("summary_status", [
  "pending",
  "completed",
  "failed",
]);

export const summaries = pgTable(
  "summaries",
  {
    id: serial("id").primaryKey(),
    summary: text("summary"),
    status: summaryStatusEnum("status").default("pending"),
    senderName: text("sender_name"),
    senderAvatar: text("sender_avatar"),
    headCommitMessage: text("head_commit_message"),
    headCommitTimestamp: timestamp("head_commit_timestamp"),
    errorMessage: text("error_message"),
    projectId: integer("project_id").references(() => projects.id),
    commitUrl: text("commit_url").notNull(),
    patchesInKB: real("patches_in_kb"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("commit_message_search_index").using(
      "gin",
      sql`to_tsvector('english', ${table.headCommitMessage})`
    ),
    index("summary_search_index").using(
      "gin",
      sql`to_tsvector('english', ${table.summary})`
    ),
  ]
);

export const summariesRelations = relations(summaries, ({ one }) => ({
  project: one(projects, {
    fields: [summaries.projectId],
    references: [projects.id],
  }),
}));

export const githubInstallations = pgTable("github_installations", {
  id: serial("id").primaryKey(),
  installationId: text("installation_id"),
  ownerLogin: text("owner_login"),
  installationToken: text("installation_token").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const githubInstallationsRelations = relations(
  githubInstallations,
  ({ one }) => ({
    user: one(user, {
      fields: [githubInstallations.userId],
      references: [user.id],
    }),
  })
);

export const notifications = pgTable(
  "notifications",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    title: text("title").notNull(),
    message: text("message").notNull(),
    read: boolean("read").default(false),
    url: text("action_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("notifications_userId_idx").on(table.userId)]
);

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(user, {
    fields: [notifications.userId],
    references: [user.id],
  }),
}));
