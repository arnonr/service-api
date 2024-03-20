const express = require("express");
const router = express.Router();

const controllers = require("../../controllers/UserController");
const auth = require("../auth");
// const { checkPermission } = require("../accessControl");

router.post("/login", controllers.onLogin);
router.post("/register", controllers.onRegister);
router.post("/confirm-email", controllers.onConfirmEmail);
router.post("/resend-confirm-email", controllers.onResendConfirmEmail);
router.post("/resend-reset-password", controllers.onResendResetPassword);
router.post("/reset-password", controllers.onResetPassword);
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
