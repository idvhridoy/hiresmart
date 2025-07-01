/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('candidate_skills', (table) => {
    table.integer('candidate_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('skill_id').unsigned().notNullable().references('id').inTable('skills').onDelete('CASCADE');
    table.primary(['candidate_id', 'skill_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('candidate_skills');
};
