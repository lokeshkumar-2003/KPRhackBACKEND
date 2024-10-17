const Property = require("../../model/Property");

module.exports.DeleteComment = async (req, res) => {
  const { propertyId, commentId } = req.params;

  // Validate required fields
  if (!propertyId || !commentId) {
    return res.status(400).json({
      message: "Property ID and Comment ID are required.",
      success: false,
    });
  }

  try {
    // Find the property by ID
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        message: "Property not found.",
        success: false,
      });
    }

    // Find the index of the comment to delete
    const commentIndex = property.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    // Check if comment exists
    if (commentIndex === -1) {
      return res.status(404).json({
        message: "Comment not found.",
        success: false,
      });
    }

    // Remove the comment from the array
    property.comments.splice(commentIndex, 1);

    // Save the updated property
    await property.save();

    return res.status(200).json({
      message: "Comment deleted successfully.",
      success: true,
      property,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};
