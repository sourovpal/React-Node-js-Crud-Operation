const multer = require("multer");
const path = require('path');


    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + "-" + Date.now()+path.extname(
            file.originalname).toLowerCase())
        }
      })
    
      const maxSize = 1 * 1000 * 1000;
        
      var AvatarImageUpload = multer({ 
            storage: storage,
            limits: { fileSize: maxSize },
            fileFilter: function (req, file, cb){
                var filetypes = /jpeg|jpg|png|webp/;
                var mimetype = filetypes.test(file.mimetype);
                var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                if (mimetype && extname) {
                    return cb(null, true);
                }
                cb("Error: File upload only supports the " + "following filetypes - " + filetypes);
            } 
      }).single('avatar');

  module.exports = AvatarImageUpload;