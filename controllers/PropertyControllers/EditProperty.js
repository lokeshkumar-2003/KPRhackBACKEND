const Property = require("../../model/Property.js");

module.exports.editProperty = async (req, res) => {
  const { userId } = req.params;

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

  if (
    !title ||
    !description ||
    !price ||
    !location ||
    !location.coordinates ||
    !location.locationName ||
    !location.locationAddress ||
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

  // Strip non-numeric characters from price and squareFootage
  const cleanedPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
  const cleanedSquareFootage = parseFloat(
    squareFootage.replace(/[^0-9.-]+/g, "")
  );

  // Check if userId is valid
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User id is required",
    });
  }

  // Fetch existing property
  const existProperty = await Property.findOne({ sellerId: userId });

  // Check if property exists
  if (!existProperty) {
    return res.status(404).json({
      success: false,
      message: "Property not found",
    });
  }

  // Update property fields
  existProperty.title = title;
  existProperty.description = description;
  existProperty.price = cleanedPrice; // Use cleaned price
  existProperty.squareFootage = cleanedSquareFootage; // Use cleaned square footage
  existProperty.location = {
    type: "Point", // Ensure location type is set
    coordinates: location.coordinates,
    locationName: location.locationName,
    locationAddress: location.locationAddress,
  };
  existProperty.type = type;
  existProperty.features = features;
  existProperty.yearBuild = yearBuild;
  existProperty.amenities = amenities;
  existProperty.images = images;
  existProperty.additionalAttributes = additionalAttributes;

  // Save updated property
  await existProperty.save();

  return res.status(200).json({
    success: true,
    message: "Property updated successfully",
  });
};
