const Properties = require("../../../model/Property.js");

module.exports.PieChartControllers = async (req, res) => {
  try {
    const properties = await Properties.find();

    // Check if properties exist
    if (!properties.length) {
      return res.status(404).json({
        success: false,
        message: "No properties found",
      });
    }

    const propertyCounts = properties.reduce(
      (acc, property) => {
        const { type } = property;
        if (type === "Office") acc.Office += 1;
        if (type === "Complex") acc.Complex += 1;
        if (type === "Land") acc.Land += 1;
        if (type === "House") acc.House += 1;
        return acc;
      },
      { Office: 0, Complex: 0, Land: 0, House: 0 }
    );

    return res.status(200).json({
      success: true,
      pieValue: propertyCounts,
    });
  } catch (error) {
    console.error("Error fetching properties for pie chart:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching properties",
      error: error.message,
    });
  }
};
