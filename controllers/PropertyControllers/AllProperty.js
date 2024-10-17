const Property = require("../../model/Property.js");

module.exports.AllProperty = async (req, res) => {
  try {
    const properties = await Property.find();

    if (!properties || properties.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No properties found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Properties retrieved successfully",
      properties,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching properties",
      error: error.message,
    });
  }
};
