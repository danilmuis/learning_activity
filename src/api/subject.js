const database_subjects = require('../database/db_subject');
const express = require("express");
const response = require('../utility/response');
const router = express.Router();

router
    .route('/')
        .get(async (req, res) =>{
            try{
                const allsubjects = await database_subjects.getAll();
                response.responseSuccess(res,allsubjects);
            }catch(e){
                response.responseFailed(res);
            }
        })
        .post(async(req,res) => {
            try{
                await database_subjects.insert(req.body);
                response.responseSuccess(res,req.body);
            }catch(e){
                response.responseFailed(res);
            }
        });
        router
        .route('/trash')
            .get(async (req, res)=>{
                try{
                    const allDeletedsubjects = await database_subjects.getDeletedAll();
                    response.responseSuccess(res,allDeletedsubjects);
                }catch(e){
                    response.responseFailed(res);
                }
            });     
router
    .route('/:id')
        .get(async (req, res)=>{
            try{
                const subjectFound = await database_subjects.getById(req.params.id);
                response.responseSuccess(res,subjectFound);
            }catch(e){
                response.responseFailed(res);
            }
        })
        .put(async (req, res)=>{
            try{
                const result = await database_subjects.updateById(req.params.id,req.body);
                result == 1 ? response.responseSuccess(res,req.body) : response.responseFailed(res);
            }catch(e){
                response.responseFailed(res);
            }
        })
        .delete(async (req, res)=>{
            try{
                const result = await database_subjects.deleteById(req.params.id);
                result == 1 ? response.responseSuccess(res,{id:req.params.id,status:'Deleted'}) : response.responseFailed(res);
            }catch(e){
                response.responseFailed(res);
            }
        });

router
    .route('/delPermanent/:id')
        .delete(async (req, res)=>{
            try{
                const result = await database_subjects.deletePermanentById(req.params.id);
                result == 1 ? response.responseSuccess(res,{id:req.params.id,status:'Permanent Deleted'}) : response.responseFailed(res);
            }catch(e){
                response.responseFailed(res);
            }
        });

router
    .route('/recovery/:id')
        .put(async (req, res)=>{
            try{
                const result = await database_subjects.recoveryDeletedById(req.params.id);
                result == 1 ? response.responseSuccess(res,{id:req.params.id,status:'Recovered'}) : response.responseFailed(res);
            }catch(e){
                response.responseFailed(res);
            }
        });


    
module.exports = router;
