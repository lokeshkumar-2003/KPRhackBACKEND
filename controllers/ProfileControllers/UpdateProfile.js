const Profile = require("../../model/Profile.js");
const User = require("../../model/User.js");

module.exports.UpdateProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const {
      username,
      email,
      profilePicture,
      phone,
      address,
      notificationPreferences: { emailNotifications, smsNotifications },
    } = req.body;

    const existUser = await User.findById({ _id: userId });
    if (!existUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const profile = await Profile.findOne({ userId: existUser._id });
    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }

    // Update the user's and profile's fields
    existUser.username = username;
    existUser.email = email;
    profile.profilePicture = profilePicture || profile.profilePicture;
    profile.phone = phone || profile.phone;
    profile.address = address || profile.address;
    profile.notificationPreferences.emailNotifications =
      emailNotifications !== undefined
        ? emailNotifications
        : profile.notificationPreferences.emailNotifications;
    profile.notificationPreferences.smsNotifications =
      smsNotifications !== undefined
        ? smsNotifications
        : profile.notificationPreferences.smsNotifications;

    // Save both the user and the profile
    await existUser.save();
    await profile.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      profile: {
        username: existUser.username,
        email: existUser.email,
        ...profile._doc,
      },
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    return res.status(500).json({
      message: "Failed to update profile",
      error: err.message,
    });
  }
};
