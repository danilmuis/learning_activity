const database_methods = require('../database/db_method');
const database_subjects = require('../database/db_subject');
const database_activities = require('../database/db_activity');
const express = require("express");
const response = require('../utility/response');
const router = express.Router();

const checkDeleted = async (data) => {
    const result_method = await database_methods.getById(data.id_method);
    const result_subject = await database_subjects.getById(data.id_subject);
    return result_method.length && result_subject.length ? false : true;
}
router
    .route('/')
        .get(async (req, res) =>{
            try{
                const dataActivity = await database_activities.getAll();
                response.responseSuccess(res,dataActivity);
            }catch(e){
                response.responseFailed(res);
            }
        });
router
    .route('/')
        .post(async (req, res) =>{
            try{
                if(await checkDeleted(req.body)){
                    response.responseFailed(res);
                }else{
                    await database_activities.insert(req.body);
                    response.responseSuccess(res,req.body);
                }
            }catch(e){
                response.responseFailed(res);
            }
        })
module.exports = router;
