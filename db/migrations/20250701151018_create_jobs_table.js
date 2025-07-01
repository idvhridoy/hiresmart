/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('jobs', (table) => {
    table.increments('id').primary();
    table.integer('employer_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.string('location').notNullable();
    table.decimal('salary_min', 10, 2);
    table.decimal('salary_max', 10, 2);
    table.enum('status', ['open', 'closed', 'archived']).defaultTo('open');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('jobs');
};
