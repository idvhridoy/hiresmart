/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('applications', (table) => {
    table.increments('id').primary();
    table.integer('candidate_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('job_id').unsigned().notNullable().references('id').inTable('jobs').onDelete('CASCADE');
    table.enum('status', ['pending', 'viewed', 'rejected', 'accepted']).defaultTo('pending');
    table.timestamps(true, true);
    table.unique(['candidate_id', 'job_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('applications');
};
