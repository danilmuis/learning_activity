const connection = require('./knexfile')[process.env.NODE_ENV || 'development']
const database = require('knex')(connection)
const getAll = () => {
    return database('metode');
}
module.exports = {
    getAll,
};
