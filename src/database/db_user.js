const database = require("./db_connection");
const db_name = "users";
const getUser = (email) => {
    return database(db_name).where({email});
}
const register = (data) =>{
    return database.insert(data).into(db_name);
}
const getById = (id) => {
    return database(db_name).where({id,isDeleted:false});
}
const updateById = (id,newData) => {
    return database(db_name).where({id,isDeleted:false}).update(newData);
}
const deleteById = (id)=>{
    return database(db_name).where({id,isDeleted:false}).update({isDeleted:true});
}
const deletePermanentById = (id) => {
    return database(db_name).where({id}).del();
}
const getDeletedAll = () => {
    return database(db_name).where({isDeleted:true});
}
const recoveryDeletedById = (id) => {
    return database(db_name).where({id,isDeleted:true}).update({isDeleted:false});
}
module.exports = {
    getUser,
    register
}