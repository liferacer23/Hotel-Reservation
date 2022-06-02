const router = require("express").Router();
const {
  updateUser,
  getUser,
  getAllUsers,
  deleteUser,
} = require("../Controllers/UserController");
const {
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");

//Check authentication

/* router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.status(200).send("Hello you are logged in!!");
});


router.put("/checkuser/:id", verifyUser, (req, res, next) => {
  res.status(200).send("Hello you are logged in and you can delete!!");
});
router.put("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
  res.status(200).send("Hello you are logged as an Admin in and you can delete!!");
});
 */

//UPDATE Users

router.put("/:id", verifyUser, updateUser);

//DELETE Users

router.delete("/:id", verifyUser, deleteUser);

//GET UsersS

router.get("/",verifyAdmin, getAllUsers);

//GET A SINGLE Users

router.get("/:id", verifyUser, getUser);

module.exports = router;
