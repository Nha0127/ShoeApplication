const express = require('express')
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
  })
// Sử dụng multer để xử lý form-data
//const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    // Truy cập dữ liệu text từ form-data thông qua req.file
    if (!req.file) {
      return res.status(400).send('No text data uploaded.');
    }
    if (req.file) {
        req.body.image = req.file.originalname;
    }

    // Xử lý dữ liệu text ở đây, ví dụ: lưu vào đĩa, xử lý, etc.
    // const textData = req.file.buffer.toString();
    // console.log('Received text:', textData);
    console.log(req.body)
    res.status(200).send('Thanh cong');
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
//connectDB();
app.listen("3000", () => {
    console.log("http://localhost:3000/");
})