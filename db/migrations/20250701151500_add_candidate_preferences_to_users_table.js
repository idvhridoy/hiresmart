/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('users', (table) => {
    table.string('location_preference');
    table.decimal('salary_min', 10, 2);
    table.decimal('salary_max', 10, 2);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('location_preference');
    table.dropColumn('salary_min');
    table.dropColumn('salary_max');
  });
};
