const Property = require("../../../model/Property.js");

module.exports.getSingleProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findOne({ _id: propertyId });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
      });
    }

    return res.status(200).json({
      success: true,
      property: property,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};
