const router = require("express").Router();
const studentRoutes = require("./student");
const instructorRoutes = require("./instructor");
const courseRoutes = require("./course");

//this is where we tell the code which router to use for which routes

// API routes
router.use("/students",studentRoutes);
router.use("/instructors",instructorRoutes);
router.use("/courses",courseRoutes);

module.exports = router;
