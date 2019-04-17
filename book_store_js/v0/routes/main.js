const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("main/home");
});


router.get("/about", (req, res) => {
    res.render("main/about");
});


// Exporting the module
module.exports = router;