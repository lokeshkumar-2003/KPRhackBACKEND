const Properties = require("../../model/Property.js");
const Profile = require("../../model/Profile.js");

module.exports.FilterProperty = async (req, res) => {
  try {
    const properties = await Properties.find();

    let filteredProperties = [];

    const {
      location,
      propertyType,
      price: { min, max },
      features,
    } = req.body;

    properties.forEach((property) => {
      if (property.type === propertyType) {
        if (location === property.location.locationName) {
          if (min <= property.price && max >= property.price) {
            let featureMatch = true;
            for (const feature in features) {
              if (
                features[feature] !== undefined &&
                features[feature] !== null
              ) {
                if (property.features[feature] !== features[feature]) {
                  featureMatch = false;
                  break;
                }
              }
            }

            if (featureMatch) {
              filteredProperties.push(property);
            }
          }
        }
      }
    });

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
