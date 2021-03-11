const db = require('../db_connection');
const express = require("express");
const response = require('../utility/response');
const router = express.Router();
router
    .route('/getActivity')
        .get(async (req, res) =>{
            try{
                const dataActivity = await db.getAll();
                response.responseSuccess(res,dataActivity);
            }catch(e){
                response.responseFailed(res);
            }
        });
router
    .route('/sendActivity')
        .post(async (req, res) =>{
            try{
                
            }catch(e){
                response.responseFailed(res);
            }
        })
module.exports = router;
