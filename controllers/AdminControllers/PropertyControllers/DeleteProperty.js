const Property = require("../../../model/Property.js");

module.exports.deleteProperty = async (req, res) => {
  try {
    const { propertyId } = req.params; // Get propertyId from request parameters

    // Delete the property by its ID
    const deletedProperty = await Property.findByIdAndDelete(propertyId);

    // Check if the property was found and deleted
    if (!deletedProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
      });
    }

    // Return a success response
    return res.status(200).json({
      success: true,
      message: "Property deleted successfully.",
      deletedProperty: deletedProperty,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};
