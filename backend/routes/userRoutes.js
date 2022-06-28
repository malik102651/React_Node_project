const express = require("express");
const { regiseterUser, authUser, user, userData,  } = require("../controllers/userController")
//tokenauthentication

const router = express.Router();

router.route("/").post(regiseterUser);
router.route("/login").post(authUser);
// router.route("/userData").post(user);
// router.route("/data/:token").get(user);
router
    .route('/userData')
    .post(userData)

// router.route('/userauthentication').get(tokenauthentication);

module.exports = router;