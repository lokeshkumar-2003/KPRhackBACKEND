const router = require("express").Router();
const {
  AddComment,
} = require("../../controllers/CommentControllers/AddComment.js");

router.post("/property/comments/:propertyId/:userId", AddComment);

module.exports = router;
