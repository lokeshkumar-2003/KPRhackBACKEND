const Property = require("../../model/Property.js");

module.exports.createProperty = async (req, res) => {
  try {
    const { sellerId } = req.body;

    // Extract property details from the request body
    const {
      title,
      description,
      price,
      location,
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
      !location ||
      !type ||
      !squareFootage ||
      !yearBuild
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Create a new property
    const newProperty = new Property({
      sellerId,
      title,
      description,
      price,
      location,
      type,
      features, // Add features directly
      squareFootage,
      yearBuild,
      amenities,
      images,
      additionalAttributes,
    });

    const property = await newProperty.save();

    return res.status(201).json({
      message: "Property created successfully",
      success: true,
      property,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    return res
      .status(500)
      .json({ message: "Failed to create property", error: error.message });
  }
};
