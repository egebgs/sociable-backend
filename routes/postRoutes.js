const express = require('express');
const validateToken = require("../controllers/validateTokenHandler");
const router = express.Router();

router.use(validateToken);

