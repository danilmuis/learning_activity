
exports.up = function(knex) {
    return knex.schema
        .createTable('subjects', table => {
            table.increments().primary() 
            table.string('subject_name').notNull() 
        })
        .createTable('methods',table=>{
            table.increments().primary() 
            table.string('method_name').notNull()
        })
        .createTable('activities', table=>{
            table.integer('id_subject').references('id').inTable('subjects')
            table.integer('id_method').references('id').inTable('methods')
            table.date('start_date').notNull()
            table.date('end_date').notNull()
        });


};
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('activities')
    .dropTableIfExists('subjects')
    .dropTableIfExists('methods');
};
