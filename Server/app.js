const express = require('express')
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Sử dụng multer để xử lý form-data
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('textData'), (req, res) => {
    // Truy cập dữ liệu text từ form-data thông qua req.file
    if (!req.file) {
      return res.status(400).send('No text data uploaded.');
    }
  
    // Xử lý dữ liệu text ở đây, ví dụ: lưu vào đĩa, xử lý, etc.
    const textData = req.file.buffer.toString();
    console.log('Received text:', textData);
  
    res.status(200).send('Text data uploaded successfully.');
  });
  
app.post('/',(req,res)=>{
    var name = req.body
    console.log(name)
    res.json("dsfdg")
})

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