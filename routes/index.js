const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const userRoutes = require("./user");
const authRoutes = require("./auth-routes");

// // API Routes
router.use("/api", apiRoutes);
router.use("/user",userRoutes);

// OAuth Route
router.use("/auth", authRoutes);

router.get("/",(req,res)=>{
  console.log(res)
})

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;