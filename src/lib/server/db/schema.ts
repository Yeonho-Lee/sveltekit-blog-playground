import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const task = sqliteTable('task', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  priority: integer('priority').notNull().default(1)
});

export const 학생 = sqliteTable('학생', {
  아이디: integer('아이디').primaryKey({ autoIncrement: true }),
  이름: text('이름').notNull(),
  학번: text('학번').notNull().unique()
});
