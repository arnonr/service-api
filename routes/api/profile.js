const express = require("express");
const router = express.Router();

const controllers = require("../../controllers/ProfileController");
const auth = require("../auth");

router.get("/", controllers.onGetAll);
router.get("/:id", controllers.onGetById);

router.post(
  "/",
  // auth.required,
  controllers.onCreate
);

router.put(
  "/:id",
  // auth.required,
  controllers.onUpdate
);

router.delete(
  "/:id",
  //   auth.required,
  controllers.onDelete
);


module.exports = router;
