const connection = require('./knexfile')[process.env.NODE_ENV || 'development']
const database = require('knex')(connection)
const getAll = () => {
    return database('metode');
}

const insertActivity = (data) =>{
    return database.insert(data).into('metode')
} 

module.exports = {
    getAll,
    insertActivity,
};
