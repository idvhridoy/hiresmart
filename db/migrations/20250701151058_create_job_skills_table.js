/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('job_skills', (table) => {
    table.integer('job_id').unsigned().notNullable().references('id').inTable('jobs').onDelete('CASCADE');
    table.integer('skill_id').unsigned().notNullable().references('id').inTable('skills').onDelete('CASCADE');
    table.primary(['job_id', 'skill_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('job_skills');
};
