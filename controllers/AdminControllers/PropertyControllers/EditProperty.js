const Property = require("../../../model/Property.js");

module.exports.editProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
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
    } = req.body;

    // Validate required fields
    if (!title || !description || !price || !location || !type || !images) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Strip non-numeric characters from price and squareFootage
    const cleanedPrice = parseFloat(price.toString().replace(/[^0-9.-]+/g, ""));
    const cleanedSquareFootage = squareFootage
      ? parseFloat(squareFootage.toString().replace(/[^0-9.-]+/g, ""))
      : null;

    // Check if propertyId is provided
    if (!propertyId) {
      return res.status(400).json({
        success: false,
        message: "Property ID is required",
      });
    }

    // Fetch the existing property by propertyId
    const existProperty = await Property.findById(propertyId);

    // Check if the property exists
    if (!existProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Update property fields
    existProperty.title = title;
    existProperty.description = description;
    existProperty.price = cleanedPrice; // Set cleaned price
    if (cleanedSquareFootage)
      existProperty.squareFootage = cleanedSquareFootage;

    // Update location details if provided
    if (
      location &&
      location.coordinates &&
      location.locationName &&
      location.locationAddress
    ) {
      existProperty.location = {
        type: "Point",
        coordinates: location.coordinates,
        locationName: location.locationName,
        locationAddress: location.locationAddress,
      };
    }

    existProperty.type = type;
    existProperty.features = features || existProperty.features; // Optional
    existProperty.yearBuild = yearBuild || existProperty.yearBuild; // Optional
    existProperty.amenities = amenities || existProperty.amenities; // Optional
    existProperty.images = images;

    // Save updated property
    await existProperty.save();

    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: existProperty,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    return res.status(500).json({
      success: false,
      message: "Server error occurred while updating property",
      error: error.message,
    });
  }
};
