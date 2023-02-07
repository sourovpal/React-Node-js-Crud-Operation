const express = require('express');
const app = express.Router();

// Controllers
const studentController = require('../App/Http/controllers/StudentController');
// Middleware
const ImageUpload = require('../App/Http/Middlewares/AvatarImageUpload');

app.use(ImageUpload);


app.get("/", studentController.index);
app.get("/:id", studentController.show);
app.post("/", studentController.store);
app.put("/:id", studentController.update);
app.delete("/:id", studentController.destroy);



module.exports = app;