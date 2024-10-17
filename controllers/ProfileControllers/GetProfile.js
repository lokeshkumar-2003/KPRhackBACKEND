const Profile = require("../../model/Profile.js");
const User = require("../../model/User.js");

module.exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
        success: false,
      });
    }

    // Fetch the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Fetch the user profile based on userId
    const userProfile = await Profile.findOne({ userId });

    // Check if the profile exists
    if (!userProfile) {
      return res.status(404).json({
        message: "User profile not found",
        success: false,
      });
    }

    // Successfully return the user profile with user details
    return res.status(200).json({
      username: user.username,
      email: user.email,
      ...userProfile._doc, // Spread the profile data into the response object
      success: true,
    });
  } catch (error) {
    // Error handling
    console.error("Error fetching user profile:", error);
    return res.status(500).json({
      message: "An error occurred while fetching the user profile",
      success: false,
      error: error.message,
    });
  }
};
