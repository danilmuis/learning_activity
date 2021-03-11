
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('subjects').del()
    .then(function () {
      // Inserts seed entries
      return knex('subjects').insert([
        {subject_name: 'Fundamental of Superintendence'},
        {subject_name: 'Introduction to TIC Industry'},
        {subject_name: 'Sharing Practice'},
        {subject_name: 'Ask The Expert'},
      ]);
    });
};
