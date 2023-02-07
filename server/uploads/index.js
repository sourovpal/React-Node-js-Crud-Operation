const express = require("express");
const app = express();
const cors = require ('cors');
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require('path');
const Validator = require('validatorjs');
const FormData = require('express-form-data');
require('dotenv').config()

// Developer Defiend Modules
const { connectionDB, connection } = require('./database/connection');
const { StudentsModel } = require("./App/models/StudentsModel");
const { Model } = require("mongoose");
const checkExits = require("./App/Helpers/Validator");

// Module Call
connectionDB();

// App Use Middleware
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use(FormData.parse());

//-------------------------------------=====--------------------======---------------//






var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
  })

  const maxSize = 1 * 1000 * 1000;
    
  var upload = multer({ 
      storage: storage,
      limits: { fileSize: maxSize },
      fileFilter: function (req, file, cb){
      
          var filetypes = /jpeg|jpg|png|webp/;
          var mimetype = filetypes.test(file.mimetype);
    
          var extname = filetypes.test(path.extname(
                      file.originalname).toLowerCase());
          
          if (mimetype && extname) {
              return cb(null, true);
          }
        
          cb("Error: File upload only supports the "
                  + "following filetypes - " + filetypes);
        } 
  }).single('avatar'); 

// var storage = multer.diskStorage({
//     // destination: './uploads',
//     destination: function(req, file, callback){
//         callback(null, './uploads');
//     },
//     filename: function(req, file, callback){
//         callback(null, file.fieldname+'-'+Date.now()+'.'+path.extname(file.originalname));

//     }
// });


// var upload = multer({
//     storage:storage,
    // dest:'./uploads',
    // filename: function(req, file, callback){
    //     callback(null, file.fieldname+'-'+Date().now()+path.extname(file.originalname));
    // },
    // limits:{
    //     fileSize: 1024 * 1024 * 10,
    //     files: 1
    // },
    // fileFilter: function(req, file, callback){
    //     let mimes = ['jpg', 'jpeg', 'png', 'webp'];
    //     if(mimes.includes(path.extname(file.originalname))){
    //         callback(null, treu);
    //     }else{
    //         callback("Uploaded file is not a valid image. Only JPG, PNG and WEBP files are allowed.", false);
    //     }
    // }
// }).single('avatar');





app.get("/", async (req, res)=>{
    const data = await StudentsModel.find({});
    res.json(data);
    // res.send("hello");
});



app.post("/", async(req, res)=>{
    // upload(req, res, (err)=>{
    //     if(err){
    //         console.log(err);
    //     }
    // });
upload(req, res, (err)=>{
        if(err){
            console.log(err);
            // res.end("Hello");
        }else{
            console.log('success');
            // res.end("Hello");
        }

    });
    console.log(req.files);
    // return 0;
    // let validation = await new Validator(req.body, {
    //     "name":'required|string|min:6|max:50',
    //     "email":'required|email|exist:students,email',
    // });

    // let checkEmail = await StudentsModel.findOne({email:req.body.email});
    // await checkExits('Email', checkEmail?false:true);

    // if(validation.passes()){
    //     try{
    //         if(req.files){
    //             console.log(req.files);
    //             // console.log(Object.keys(req.files).length);
    //             res.end("Hello");
    //             return ;
    //             req.body.avatar = req.files[0].filename;
    //         }else{
    //             req.body.avatar = 'default-img.png';
    //         }
    //         // await StudentsModel.create(req.body);
    //         console.log(req.body);
    //         res.status(200).json({
    //             status:true,
    //             message:'New user created successful.',
    //             data:[],           
    //             errors:[],
    //         });
    //     }catch(error){
    //         res.status(500).json({
    //             status:false,
    //             message:'Something went wrong please try again.',
    //             data:[],           
    //             errors:error,
    //         });
    //     }

    // }else{
    //     res.status(422).json({
    //         status:false,
    //         message:'Something went wrong please try again.',
    //         data:[],           
    //         errors:validation.errors.all(),
    //     });
    // }
});


app.get('/:id', (req, res)=>{
    console.log(req.params.id);
    res.send({});
});


app.use((err, req, res, next)=>{
    console.log("+++++++++++++++++++++++++++",err,"+++++++++++++++++++++++++++++");
})

app.listen(8080, ()=>{
    console.log("http://localhost:8080");
});
