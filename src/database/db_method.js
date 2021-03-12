const database = require('./db_connection');
const getAll = () => {
    return database('methods').where({isDeleted:false});
}
const insert = (data) =>{
    return database.insert(data).into('methods');
}
const getById = (id) => {
    return database('methods').where({id,isDeleted:false});
}
const updateById = (id,newData) => {
    return database('methods').where({id,isDeleted:false}).update(newData);
}
const deleteById = (id)=>{
    return database('methods').where({id}).update({isDeleted:true});
}
const deletePermanentById = (id) => {
    return database('methods').where({id}).del();
}
const getDeletedAll = () => {
    return database('methods').where({isDeleted:true});
}
const recoveryDeletedById = (id) => {
    return database('methods').where({id}).update({isDeleted:false});
}
module.exports = {
    getAll,
    insert,
    getById,
    updateById,
    deleteById,
    deletePermanentById,
    recoveryDeletedById,
    getDeletedAll
}