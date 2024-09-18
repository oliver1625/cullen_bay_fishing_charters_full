const { Router } = require("express");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/users");
const { verifyToken,verifyUser, verifyAdmin } = require("../utils/verifyToken");

const router = Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user, u are logged din");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, u are logged in and can delete account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello user, u are logged in and can delete allll account");
// });

//Create Users
router.put("/:id",verifyUser, updateUser);
router.delete("/:id", verifyUser,deleteUser);
router.get("/:id", verifyUser, getUser);
router.get("/",verifyAdmin, getAllUsers);

module.exports = router;
