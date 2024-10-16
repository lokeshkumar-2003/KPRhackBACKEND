const Property = require("../../model/Property.js");
const User = require("../../model/User.js");
const UserProfile = require("../../model/Profile.js");

module.exports.createProperty = async (req, res) => {
  try {
    const { userId } = req.params; // Getting userId from params
    const {
      title,
      description,
      price,
      location: { locationAddress, coordinates, locationName },
      type,
      features,
      squareFootage,
      yearBuild,
      amenities,
      images,
      additionalAttributes,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !price ||
      !locationAddress ||
      !coordinates ||
      !locationName ||
      !type ||
      !features ||
      !squareFootage ||
      !yearBuild ||
      !amenities ||
      !images ||
      !additionalAttributes
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Parse and clean price and squareFootage
    const parsedPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    const parsedSquareFootage = parseFloat(
      squareFootage.replace(/[^0-9.-]+/g, "")
    );

    // Check if parsing was successful
    if (isNaN(parsedPrice) || isNaN(parsedSquareFootage)) {
      return res.status(400).json({
        message: "Price and Square Footage must be valid numbers.",
        success: false,
      });
    }

    const addedProperty = new Property({
      sellerId: userId,
      title,
      description,
      price: parsedPrice,
      location: {
        type: "Point",
        coordinates,
        locationName,
        locationAddress,
      },
      type,
      features,
      squareFootage: parsedSquareFootage,
      yearBuild,
      amenities,
      images,
      additionalAttributes,
    });

    await addedProperty.save();
    return res.status(201).json({
      success: true,
      message: "Property Added successfully",
      property: addedProperty, // Return the created property
    });
  } catch (err) {
    console.error("Error creating property:", err);
    return res.status(500).json({
      message: "Failed to create property",
      error: err.message,
    });
  }
};
