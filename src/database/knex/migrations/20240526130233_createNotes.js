/** @typedef {import('knex/types').Knex} knex */

/**
 *
 * @param {knex} knex
 */
exports.up = (knex) =>
  knex.schema.createTable('notes', (table) => {
    table.increments('id');
    table.text('title');
    table.text('description');
    table.integer('user_id').references('id').inTable('users');
    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now());
  });
/**
 *
 * @param {knex} knex
 */

exports.down = (knex) => knex.schema.dropTable('notes');
