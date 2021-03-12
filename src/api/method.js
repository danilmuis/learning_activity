const database_methods = require('../database/db_method');
const express = require("express");
const response = require('../utility/response');
const router = express.Router();

router
    .route('/')
        .get(async (req, res) =>{
            try{
                const allMethods = await database_methods.getAll();
                response.responseSuccess(res,allMethods);
            }catch(e){
                response.responseFailed(res);
            }
        })
        .post(async(req,res) => {
            try{
                await database_methods.insert(req.body);
                response.responseSuccess(res,req.body);
            }catch(e){
                response.responseFailed(res);
            }
        });
        router
        .route('/trash')
            .get(async (req, res)=>{
                try{
                    const allDeletedMethods = await database_methods.getDeletedAll();
                    response.responseSuccess(res,allDeletedMethods);
                }catch(e){
                    response.responseFailed(res);
                }
            });     
router
    .route('/:id')
        .get(async (req, res)=>{
            try{
                const methodFound = await database_methods.getById(req.params.id);
                response.responseSuccess(res,methodFound);
            }catch(e){
                response.responseFailed(res);
            }
        })
        .put(async (req, res)=>{
            try{
                await database_methods.updateById(req.params.id,req.body);
                response.responseSuccess(res,req.body);
            }catch(e){
                response.responseFailed(res);
            }
        })
        .delete(async (req, res)=>{
            try{
                await database_methods.deleteById(req.params.id);
                response.responseSuccess(res,{id:req.params.id,status:'Deleted'});
            }catch(e){
                response.responseFailed(res);
            }
        });

router
    .route('/delPermanent/:id')
        .delete(async (req, res)=>{
            try{
                await database_methods.deletePermanentById(req.params.id);
                response.responseSuccess(res,{id:req.params.id,status:'Permanent Deleted'});
            }catch(e){
                response.responseFailed(res);
            }
        });

router
    .route('/recovery/:id')
        .put(async (req, res)=>{
            try{
                await database_methods.recoveryDeletedById(req.params.id);
                response.responseSuccess(res,{id:req.params.id,status:'Recovered'});
            }catch(e){
                response.responseFailed(res);
            }
        });


    
module.exports = router;
