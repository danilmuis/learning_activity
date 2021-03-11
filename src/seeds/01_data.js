
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('metode').del()
    .then(function () {
      // Inserts seed entries
      return knex('metode').insert([
        {id: 1, 'nama': 'rowValue1'},
        {id: 2, 'nama': 'rowValue2'},
        {id: 3, 'nama': 'rowValue3'}
      ]);
    });
};
