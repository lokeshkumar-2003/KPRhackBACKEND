const Property = require("../../../model/Property.js");

module.exports.createProperty = async (req, res) => {
  try {
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

    if (!title || !description || !price || !location || !type) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Create a new property
    const newProperty = new Property({
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
