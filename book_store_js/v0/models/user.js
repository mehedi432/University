const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const Schema = mongoose.Schema;

/**
 *
 *  User schema attributes or characteristics or fields.
 *
 *  */
let UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,

    profile: {
        name: { type: String, default: "" },
        picture: { type: String, default: "" }
    },
    address: String,

    history: [{
        date: Date,
        paid: { type: Number, default: 0 }
    }]
});

/**
 * Hash the password before even save it to the database
 */
UserSchema.pre("save", (next) => {
    let user = this;
    if (!user.isModified("password")) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        })
    });
});

/**
 * Compare password in the database and the one that the user typed in
 */
UserSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
}

// Exporting the module
module.exports = mongoose.model("User", UserSchema);