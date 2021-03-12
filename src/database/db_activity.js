const database = require("./db_connection");
const db_name = "activities";

const getAll = ()=>{
    return database(db_name).where({isDeleted:false});
}
const insert = (data)=>{
    return database.insert(data).into(db_name);
}
module.exports = {
    getAll,
    insert
}