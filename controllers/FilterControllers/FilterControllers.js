const Properties = require("../../model/Property.js");

module.exports.FilterProperty = async (req, res) => {
  try {
    const { location } = req.body;

    // Build query without price filtering
    const query = {
      ...(location && { "location.locationName": location }),
    };

    const properties = await Properties.find(query);

    // Return the retrieved properties
    return res.status(200).json({
      message: "Data retrieved successfully",
      properties,
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
