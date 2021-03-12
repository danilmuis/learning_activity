// Update with your config settings.
require('dotenv').config({path:'../.env'});

const koneksi = {
  database: process.env.PG_DB,
  user:     process.env.PG_USER,
  password: process.env.PG_PASS
};
module.exports = {
  development: {
    client: 'postgresql',
    connection: koneksi,
  },
  production: {
    client: 'postgresql',
    connection: koneksi,
  }
};
