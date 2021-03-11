
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('activities').del()
    .then(function () {
      // Inserts seed entries
      return knex('activities').insert([
        {id_method: 1, id_subject:1, start_date: '2019-01-02', end_date: '2019-01-05'},
        {id_method: 1, id_subject:2, start_date: '2019-01-03', end_date: '2019-01-05'},
        {id_method: 2, id_subject:3, start_date: '2019-03-12', end_date: '2019-03-15'},
        {id_method: 2, id_subject:3, start_date: '2019-05-12', end_date: '2019-05-15'},
      ]);
    });
};
