require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/database.js');
const creativityRoutes = require('./routes/creativities.js');
const activitiesRoutes = require('./routes/activities');
const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");
const verifyRoutes = require("./routes/verifyUser.js");

//connect database
connectDB();

//middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", verifyRoutes);
app.use('/api/v1/creativities', creativityRoutes);
app.use('/api/v1/activities', activitiesRoutes);

app.listen(5000, function () {
	console.log('server is running on PORT: 5000');
});
