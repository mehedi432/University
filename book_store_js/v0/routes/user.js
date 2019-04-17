const router = require("express").Router();
const User = require("../models/user");


router.get("/", (req, res, next) => {
    res.render("accounts/user");
});


router.post("/signup", (req, res, next) => {
    let user = new User();

    // Get all the form data for creating a new user
    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    User.findOne({ email: req.body.email }, (err, userExist) => {
        if (userExist) {
            console.log(`${req.body.email} is already exist`);
            return res.redirect("/signup");
        } else {
            // Saving data to the database
            user.save((err, user) => {
                if (err) return next(err);
                res.json('New user has been created');
            });

        }
    });
});


module.exports = router;