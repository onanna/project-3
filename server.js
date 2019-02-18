const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
// const PORT = process.env.PORT || 3001;

//=====================================================
// body parser added by Jemall for passport function
const bodyParser = require("body-parser");
const passport = require("passport")
const users = require("./routes/api/users")
//=====================================================

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//=====================================================
// Also added by Jemall
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
  );
  app.use(bodyParser.json());
  
  //=====================================================
  // Also added by Jemall
  // moved infront of app.listen
  // Add routes, both API and view
  app.use(routes);


  // Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
  //=====================================================


// DB Config
const db = require("./config/keys").mongoURI;

// const db = "mongodb://tester:testerpassword@cluster0-shard-00-00-dqkhu.mongodb.net:27017,cluster0-shard-00-01-dqkhu.mongodb.net:27017,cluster0-shard-00-02-dqkhu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"



// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log("Error connecting mongo database",err));
  
  //=====================================================
  //
  // added by Jemall for passport operation
  // Passport middleware
  app.use(passport.initialize());
  // Passport config
  require("./config/passport")(passport);
  // Routes
  app.use("/api/users", users);
  //
  //=====================================================
  
  const port = process.env.PORT || 3001; // process.env.port is Heroku's port if you choose to deploy the app there
  app.listen(port, () => console.log(`🌎  ==> API Server now up and running on port ${port} !`));
  //=====================================================

  


// original connection to the Mongo DB // Jemall Modified for passport using Atlas remote db
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/courseCreator",{ useNewUrlParser: true });


// const student = require("./controllers/studentController");
// student.addStu();

// Start the API server
// app.listen(PORT, function() {
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });
