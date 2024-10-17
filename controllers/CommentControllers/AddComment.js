const Property = require("../../model/Property.js");

module.exports.AddComment = async (req, res) => {
  const { userId, propertyId } = req.params;
  const { comment } = req.body;

  // Validate required fields
  if (!userId || !propertyId || !comment) {
    return res.status(400).json({
      message: "User ID, Property ID, and Comment text are all required.",
      success: false,
    });
  }

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        message: "Property not found",
        success: false,
      });
    }

    const response = await fetch(`http://localhost:2012/api/profile/${userId}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error fetching profile:", response.status, errorText);
      return res.status(response.status).json({
        message: "Error fetching profile",
        success: false,
      });
    }

    const profile = await response.json();
    const userName = profile.username || "Anonymous";
    const profilePicture = profile.profilePicture || "default.png"; // Default image

    // Add the comment to the property
    property.comments.push({
      userName,
      profilePicture,
      comment,
    });

    await property.save();

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
