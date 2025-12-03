import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	createdAt: timestamp("created_at").defaultNow(),
});

export const githubSummaries = pgTable("github_summaries", {
	id: serial("id").primaryKey(),
	repository: text("repository").notNull(),
	branch: varchar("branch", { length: 255 }).notNull(),
	commitSha: varchar("commit_sha", { length: 255 }).notNull(),
	commitMessage: text("commit_message").notNull(),
	diffSummary: text("diff_summary"),
	llmSummary: text("llm_summary").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
