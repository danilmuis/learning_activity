const bcrypt = require("bcrypt");
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(async function () {
      // Inserts seed entries
      var salt = await bcrypt.genSalt(10);
      var hash = await bcrypt.hash('admin', salt);
      return knex('users').insert([
        {email: 'admin@activity.com', password: hash},
        {email: 'admin@learn.com', password: hash},
      ]);
    });
};
