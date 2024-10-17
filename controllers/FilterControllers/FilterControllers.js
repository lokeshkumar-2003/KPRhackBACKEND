const Properties = require("../../model/Property.js");

module.exports.FilterProperty = async (req, res) => {
  try {
    const { location, propertyType, price = {}, features = {} } = req.body;

    const { min = 0, max = Infinity } = price;

    const query = {
      ...(propertyType && { type: propertyType }),
      ...(location && { "location.locationName": location }),
      price: { $gte: min, $lte: max }, // Price range condition
    };

    // Fetch properties that match the query
    const properties = await Properties.find(query);

    // Filter properties based on features (done in-memory)
    const filteredProperties = properties.filter((property) => {
      let featureMatch = true;

      // Check for matching features
      for (const feature in features) {
        if (
          features[feature] !== undefined &&
          features[feature] !== null &&
          property.features[feature] !== features[feature]
        ) {
          featureMatch = false;
          break;
        }
      }

      return featureMatch;
    });

    // Return filtered properties
    return res.status(200).json({
      message: "Data retrieved successfully",
      filteredProperties,
      success: true,
    });
  } catch (err) {
    console.error("Error filtering properties:", err);
    return res.status(500).json({
      message: "Failed to retrieve properties",
      error: err.message,
      success: false,
    });
  }
};
