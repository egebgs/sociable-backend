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

exports.sendNotificationOnFileUpload = functions.storage.object().onFinalize((object) => {
    const filePath = object.name; // File path in the bucket.

    // Prepare the notification
    const message = {
        notification: {
            title: 'A new file has been uploaded',
            body: `File ${filePath} has been uploaded`,
        },
        topic: 'new-file-uploads' // This can be the user's UID or any topic that you want to send the notification to
    };

    // Send the notification
    return admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
});
