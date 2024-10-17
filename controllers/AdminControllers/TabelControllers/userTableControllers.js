const User = require("../../../model/User");
const Profile = require("../../../model/Profile");

module.exports.userTableControllers = async (req, res) => {
  try {
    const users = await User.find();

    let userTable = [];

    const profiles = await Profile.find({
      userId: { $in: users.map((user) => user._id) },
    });

    const profileMap = profiles.reduce((acc, profile) => {
      acc[profile.userId] = profile;
      return acc;
    }, {});

    users.forEach((user) => {
      const userProfile = profileMap[user._id]; // Access profile by userId
      const nosOfBuys = userProfile ? userProfile.buyedProperties.length : 0;

      userTable.push({
        username: user.username,
        email: user.email,
        nosOfBuys: nosOfBuys,
        phone: userProfile.phone || "Not provided", // Ensure the phone number is included
      });
    });

    return res.status(200).json({
      success: true,
      userTable: userTable,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};
