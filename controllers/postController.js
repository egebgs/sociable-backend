const Post = require("../models/postModel");
const multer = require("multer");
const asyncHandler = require('express-async-handler');
const {Storage} = require('@google-cloud/storage');
const {firebaseConfig} = require("../config/firebaseConfig");
require('dotenv').config();


const createPost = asyncHandler(async (req, res, next) => {
    let imageURL = "";
    const storage = new Storage({
        projectId: firebaseConfig.projectId,
        keyFilename: './config/socialize-f4439-firebase-adminsdk-a8fgi-b17c1d771c.json' // Your service account key file path
    });

    const bucket = storage.bucket('gs://socialize-f4439.appspot.com');

    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
        console.error(err);
        next(err);  
    });

    blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        imageURL = publicUrl;
    });


    res.status(200).send(imageURL);

    blobStream.end(req.file.buffer);




});

module.exports = {createPost};