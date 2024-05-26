/** @typedef {import('knex/types').Knex} knex */

/**
 *
 * @param {knex} knex
 */
exports.up = (knex) =>
  knex.schema.createTable('tags', (table) => {
    table.increments('id');
    table.text('name').notNullable();
    table.integer('note_id').references('id').inTable('notes').onDelete("CASCADE");
    table.integer('user_id').references('id').inTable('users');
   });
/**
 *
 * @param {knex} knex
 */

exports.down = (knex) => knex.schema.dropTable('tags');
