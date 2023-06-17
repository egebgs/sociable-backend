const express = require('express');
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const multer = require("multer");
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
require('dotenv').config();

connectDB();
const app = express();

const port = process.env.PORT || 5000

const firebaseConfig = {
    apiKey: "AIzaSyC_fP8ipeQS0ZPN1N3ZWL_sRJAsZs2-F6I",
    authDomain: "socialize-f4439.firebaseapp.com",
    projectId: "socialize-f4439",
    storageBucket: "socialize-f4439.appspot.com",
    messagingSenderId: "1005968892525",
    appId: "1:1005968892525:web:377347fbb06ec0a5911564",
    measurementId: "G-CX5BRP8VJG"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

app.use(express.json());
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/post", require("./routes/postRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
