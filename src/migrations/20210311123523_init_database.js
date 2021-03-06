exports.up = function(knex) {
    return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable('subjects', table => {
            table.uuid('id').primary().defaultTo(knex.raw("uuid_generate_v4()"));
            table.string('subject_name').notNull();
            table.boolean('isDeleted').defaultTo(0);
        })
        .createTable('methods',table=>{
            table.uuid('id').primary().defaultTo(knex.raw("uuid_generate_v4()"));
            table.string('method_name').notNull();
            table.boolean('isDeleted').defaultTo(0);
        })
        .createTable('activities', table=>{
            table.uuid('id').primary().defaultTo(knex.raw("uuid_generate_v4()"));
            table.uuid('id_subject').references('id').inTable('subjects').onUpdate('CASCADE').onDelete('CASCADE').notNull();
            table.uuid('id_method').references('id').inTable('methods').onUpdate('CASCADE').onDelete('CASCADE').notNull();
            table.date('start_date').notNull();
            table.date('end_date').notNull();
            table.boolean('isDeleted').defaultTo(0);
        })
        .createTable('users',table =>{
            table.uuid('id').primary().defaultTo(knex.raw("uuid_generate_v4()"));
            table.string('email').notNull();
            table.string('password').notNull();
        })
        .alterTable('users',table =>{
            table.unique('email')
        })
};
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('activities')
    .dropTableIfExists('subjects')
    .dropTableIfExists('methods');
};
