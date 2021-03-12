var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const database_users = require('../database/db_user');
const jwt_auth = require("./jwt_auth");

passport.serializeUser(function(user,done){
    done(null,user);
});

passport.deserializeUser(function(user,done){
    done(null,user);
})
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    callbackURL: process.env.GOOGLE_OAUTH_CALLBACK
  },
  async function(token, tokenSecret, profile, done) {
    const email = profile.emails[0].value;
    const userFound = await database_users.getUser(email);
    if(userFound.length){
      const token = jwt_auth.generateAccessToken({
        id:userFound[0].id,
        email: email,
      });
      return done(null,{ _token: token + "" });
    }else{
      return done(null,{ 'message': 'User not registered' });
    }
  }
));