const express = require('express');
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
require('dotenv').config();

connectDB();
const app = express();

const port = process.env.PORT|| 5000

app.use(express.json());
app.use("/api/user", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});