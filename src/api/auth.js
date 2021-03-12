const database_users = require('../database/db_user');
const express = require("express");
const response = require('../utility/response');
const router = express.Router();
const jwt_auth = require('../utility/jwt_auth');
const bcrypt = require("bcrypt");
const passport = require("passport");
require("../utility/google_auth");
const emailIsValid =  (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
router
    .route('/login')
        .post(async (req, res)=>{
            if(emailIsValid(req.body.email)){
                const userFound = await database_users.getUser(req.body.email);
                var checkLogin = await bcrypt.compare(req.body.password, userFound[0].password);
                if(checkLogin){
                    const token = jwt_auth.generateAccessToken({
                        id:userFound[0].id,
                        email: req.body.email,
                    });
                    response.responseSuccess(res,{token});
                }else{
                    response.responseFailedLogin(res);
                }
            }else{
                response.responseFailedLogin(res);
            }
            
        })
router
    .route('/register')
        .post(async (req, res)=>{
            if(emailIsValid(req.body.email)){
                var salt = await bcrypt.genSalt(10);
                var hash = await bcrypt.hash(req.body.password, salt);
                const data = {
                    email : req.body.email,
                    password : hash
                }
                try {
                    await database_users.register(data);
                    response.responseSuccess(res,{'user' : data.email, 'status' : 'registered'});
                }catch(e){
                    response.responseUnauthorized(res);
                }
            }else{
                response.responseUnauthorized(res);
            }
        });   
router
    .route('/googleAuth')
        .get(
            passport.authenticate("google", {
                scope: ["https://www.googleapis.com/auth/plus.login", "email"],
            })
        );
router
    .route("/googleAuth/callback")
        .get(
            passport.authenticate("google", { failureRedirect: "/googleAuth/failed" }),
            async (req, res) => {
                response.responseSuccess(res,req.user);
            }
        );
module.exports = router;
        