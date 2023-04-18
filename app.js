const path=require("path")

const express=require("express")
const cors=require('cors');
const bodyParser = require('body-parser');
const dotenv=require("dotenv")
dotenv.config()

const sequelize=require("./util/database")
const usersRoute=require("./route/singup");
const passport = require("passport");
const session=require('express-session')

const app=express()
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret:"SECRET"
  }));
  
app.use(passport.initialize())
app.use(cors({
    origin:"*"
}))

app.use(bodyParser.json({extended:false}))

app.use('/user',usersRoute)

sequelize.sync()
.then(result=>{
    console.log("connected")
    app.listen(3000)
})
.catch(err=>{
    console.log(err)
})

var userProfile;

app.use(passport.initialize());
app.use(passport.session());


// Update the route handler for /success/google-login
app.get('/success/google-login', (req, res) => {
    // Access the user profile data from the Passport session
    const { name, email, sub } = req.user._json;
    
    // You can access other properties from the user profile as needed
    
    // Redirect to login.html passing the user profile data as query parameters
    res.redirect(`/signup.html?displayName=${name}&email=${email}&id=${sub}`);
  });
  
  // Update the route handler for serving static files
  app.use(express.static(path.join(__dirname, 'view')));
  
  // Update the route handler for /login.html to access query parameters
  app.get('/signup.html', (req, res) => {
    // Access query parameters from req.query object
    const { displayName, email, id } = req.query;
    
    // Render the login.html file and pass query parameters to the view
    res.render('signup.html', { displayName, email, id });
  });
  
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = 'our-google-client-id';
const GOOGLE_CLIENT_SECRET = 'our-google-client-secret';
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));

app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success/google-login');
  });

  app.use((req,res)=>{
    res.sendFile(path.join(__dirname,`${req.url}`))
})