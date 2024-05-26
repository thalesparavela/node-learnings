/** @typedef {import('knex/types').Knex} knex */

/**
 *
 * @param {knex} knex
 */
exports.up = (knex) =>
  knex.schema.createTable('links', (table) => {
    table.increments('id');
    table.text('url').notNullable();
    table.integer('note_id').references('id').inTable('notes').onDelete("CASCADE");
    table.timestamp('created_at').default(knex.fn.now());
  });
/**
 *
 * @param {knex} knex
 */

exports.down = (knex) => knex.schema.dropTable('links');
