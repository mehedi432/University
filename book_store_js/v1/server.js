// Import requirements
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const engine = require("ejs-mate");
const morgan = require("morgan");
const ejs = require("ejs");


// Import personal requirements
const User = require("./models/user");


// Instantiate express as app
const app = express();


// Connecting to the database
mongoose.connect("", (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Connected to database");
	}
});


// Middlewares
app.use(express.static(__dirname + " /public "));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));
app.engine("ejs", engine);
app.set("view engine", "ejs");

// Route requirements		
const mainRoutes = require("./routes/main");
const userRoutes = require("./routes/main");

// Router middlewares
app.use(mainRoutes);
app.use(userRoutes);


// Make app listen on specific port
const port = 3000;
app.listen(port, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`Server is running on port ${port}`);
	}
});
