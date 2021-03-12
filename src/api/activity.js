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
        })
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
        });
router
    .route('/trash')
        .get(async (req, res)=>{
            try{
                const allDeletedActivities = await database_activities.getDeletedAll();
                response.responseSuccess(res,allDeletedActivities);
            }catch(e){
                response.responseFailed(res);
            }
        });    
router
    .route('/:id')
        .get(async (req, res) =>{
            try{
                const activityFound = await database_activities.getById(req.params.id);
                response.responseSuccess(res,activityFound);
            }catch(e){
                response.responseFailed(res);
            }
        })
        .put(async (req, res) =>{
            try{
                const newData = {
                    start_date:req.body.start_date,
                    end_date:req.body.end_date
                }
                const result = await database_activities.updateById(req.params.id,newData);
                result == 1 ? response.responseSuccess(res,req.body) : response.responseFailed(res);
                
            }catch(e){
                console.log(e);
                response.responseFailed(res);
            }
        })
        .delete(async (req, res)=>{
            try{
                const result = await database_activities.deleteById(req.params.id);
                result == 1 ? response.responseSuccess(res,{id:req.params.id,status:'Deleted'}) : response.responseFailed(res);
            }catch(e){
                response.responseFailed(res);
            }
        });
router
    .route('/delPermanent/:id')
        .delete(async (req, res)=>{
            try{
                const result = await database_activities.deletePermanentById(req.params.id);
                result == 1 ? response.responseSuccess(res,{id:req.params.id,status:'Permanent Deleted'}) : response.responseFailed(res);
            }catch(e){
                response.responseFailed(res);
            }
        });
    
router
    .route('/recovery/:id')
        .put(async (req, res)=>{
            try{
                const result = await database_activities.recoveryDeletedById(req.params.id);
                result == 1 ? response.responseSuccess(res,{id:req.params.id,status:'Recovered'}) : response.responseFailed(res);
            }catch(e){
                response.responseFailed(res);
            }
        });
    
           
module.exports = router;
