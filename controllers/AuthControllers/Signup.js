const User = require("../../model/User");
const bcrypt = require("bcryptjs");

module.exports.Register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }

    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists.", success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({
      message: "User registered successfully.",
      user: newUser,
      success: false,
    });

    next();
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error.", success: false });
  }
};
