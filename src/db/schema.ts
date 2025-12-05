import { relations } from "drizzle-orm";
import { index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
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
	(table) => [index("projects_userId_idx").on(table.userId)],
);

export const projectsRelations = relations(projects, ({ one }) => ({
	user: one(user, {
		fields: [projects.userId],
		references: [user.id],
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
	}),
);
