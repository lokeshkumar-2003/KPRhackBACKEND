const router = require("express").Router();
const {
  AddComment,
} = require("../../controllers/CommentControllers/AddComment.js");
const {
  DeleteComment,
} = require("../../controllers/CommentControllers/DeleteComment");

router.post("/property/comments/:propertyId/:userId", AddComment);
router.delete("/property/comments/:propertyId/:commentId", DeleteComment);

module.exports = router;
