const Property = require("../../model/Property.js");
const Profile = require("../../model/Profile.js");
const User = require("../../model/User.js");

module.exports.AddComment = async (req, res) => {
  const { userId, propertyId } = req.params;
  const { comment } = req.body;

  // Validate required fields
  if (!userId) {
    return res.status(400).json({
      message: "User ID is required",
      success: false,
    });
  }

  if (!propertyId) {
    return res.status(400).json({
      message: "Property ID is required",
      success: false,
    });
  }

  try {
    // Find the property by ID
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        message: "Property not found",
        success: false,
      });
    }

    // Find the user profile by user ID
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({
        message: "User profile not found",
        success: false,
      });
    }

    // Add comment to the property
    property.comments.push({
      profilePicture: profile.profilePicture,
      userName: profile.userName,
      comment: comment,
    });

    // Save the updated property
    await property.save();

    // Respond with success
    return res.status(200).json({
      message: "Comment added successfully",
      success: true,
      property,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
