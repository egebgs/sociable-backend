const express = require('express');
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const multer = require("multer");
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require("cors");
require('dotenv').config();

admin.initializeApp();

connectDB();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000

app.use(express.json());
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/post", require("./routes/postRoutes"));
app.use(errorHandler);


app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});
