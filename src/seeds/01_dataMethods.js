
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('methods').del()
    .then(function () {
      // Inserts seed entries
      return knex('methods').insert([
        {method_name: 'Workshop/ Self Learning'},
        {method_name: 'Sharing Practice/Professional Talk'},
        {method_name: 'Discussion Room'}
      ]);
    });
};
