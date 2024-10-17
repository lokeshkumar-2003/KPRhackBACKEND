const Property = require("../../model/Property");
const Profile = require("../../model/Profile");
const Purchase = require("../../model/Purchase"); // Ensure you have this model

module.exports.BuyProperty = async (req, res) => {
  const { userId, propertyId } = req.params;

  if (!userId || !propertyId) {
    return res.status(400).json({
      message: "User ID and Property ID are required.",
      success: false,
    });
  }

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        message: "Property not found.",
        success: false,
      });
    }

    if (property.status === "sold") {
      return res.status(400).json({
        message: "Property is already sold.",
        success: false,
      });
    }

    const purchase = new Purchase({
      propertyId,
      buyerId: userId,
      purchasePrice: property.price,
    });

    await purchase.save();

    property.status = "sold";
    await property.save();

    // Find the profile of the user
    const profile = await Profile.findOne({ userId });
    console.log(profile);

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found.",
        success: false,
      });
    }

    // Add the purchase to the profile
    profile.buyedProperties.push(purchase._id);
    await profile.save(); // Ensure to await the save operation

    return res.status(200).json({
      message: "Property purchased successfully.",
      success: true,
      purchase,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};
