
exports.up = function(knex) {
    return knex.schema.createTable('metode', table => {
        table.increments() // this represents the primary key.
        table.string('nama') // this is a column.
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('metode')
};
