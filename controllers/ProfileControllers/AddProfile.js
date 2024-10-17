const Profile = require("../../model/Profile.js");
const User = require("../../model/User.js");

module.exports.AddProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const {
      profilePicture,
      phone,
      address,
      notificationPreferences: { emailNotifications, smsNotifications },
    } = req.body;

    const existUser = await User.findById(userId);
    if (!existUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (!phone || !address) {
      return res.status(400).json({
        message: "Phone and address are required",
        success: false,
      });
    }

    const newProfile = new Profile({
      userId: existUser._id,
      profilePicture: profilePicture || null,
      phone: phone,
      address: address,
      notificationPreferences: {
        emailNotifications: emailNotifications || true,
        smsNotifications: smsNotifications || false,
      },
    });

    const profile = await newProfile.save();

    return res.status(201).json({
      message: "Profile created successfully",
      success: true,
      profile: {
        username: existUser.username,
        email: existUser.email,
        ...profile._doc,
      },
    });
  } catch (err) {
    console.error("Error creating profile:", err);
    return res.status(500).json({
      message: "Failed to create profile",
      error: err.message,
    });
  }
};
