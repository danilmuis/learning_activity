const database = require("./db_connection");
const db_name = "users";
const getUser = (email) => {
    return database(db_name).where({email});
}
const register = (data) =>{
    return database.insert(data).into(db_name);
}
module.exports = {
    getUser,
    register
}