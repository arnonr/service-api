const express = require("express");
// import api from './api/index.js'
const user = require("./api/user");
const profile = require("./api/profile");
const news = require("./api/news");
const newsType = require("./api/news-type");
const banner = require("./api/banner");
const about = require("./api/about");
const contact = require("./api/contact");
const department = require("./api/department");
const team = require("./api/team");
const froala = require("./api/froala");
const newsGallery = require("./api/news-gallery");
const serviceCategory = require("./api/service-category");
const serve = require("./api/serve");

const router = express.Router();

router.use(
  `/service-api/api/v${process.env.API_VERSION}`,
  router.use("/user", user),
  router.use("/profile", profile),
  router.use("/news", news),
  router.use("/news-type", newsType),
  router.use("/banner", banner),
  router.use("/about", about),
  router.use("/contact", contact),
  router.use("/department", department),
  router.use("/team", team),
  router.use("/froala", froala),
  router.use("/news-gallery", newsGallery),
  router.use("/service-category", serviceCategory),
  router.use("/serve", serve)
);

module.exports = router;
