const User = require("../../model/User");
const bcrypt = require("bcryptjs");

module.exports.LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials.", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials.", success: false });
    }

    res.status(200).json({
      message: "Login successful.",
      success: true,
      user: { id: user._id, username: user.username, email: user.email },
    });

    next();
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error.", success: false });
  }
};
