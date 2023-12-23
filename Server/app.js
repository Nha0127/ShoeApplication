const express = require('express')
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function connectDB() {
    const uri = "mongodb+srv://nha123:12345@atlascluster.rsxqmpm.mongodb.net/shoe?retryWrites=true&w=majority&appName=AtlasApp"
    try {
        await mongoose.connect(uri);
        console.log('ok')
    } catch (e) {
        console.error(e);
    }
}
connectDB();
app.listen("3000", () => {
    console.log("http://localhost:3000/");
})