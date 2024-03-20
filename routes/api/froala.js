const express = require("express");
const router = express.Router();

const controllers = require("../../controllers/FroalaController");

router.post("/image", controllers.onUploadImage);

router.post("/document", controllers.onUploadDocument);

router.post("/video", controllers.onUploadVideo);

router.post("/uppy", controllers.onUploadUppy);

module.exports = router;
