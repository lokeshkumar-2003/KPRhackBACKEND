const Property = require("../../../model/Property");

module.exports.BarChartDataController = async (req, res) => {
  try {
    const monthlyCounts = await Property.aggregate([
      {
        $match: {
          status: "sold", // Filter for properties with status 'sold'
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$createdAt" },
          },
          count: { $sum: 1 }, // Count the number of sold properties created each month
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month in ascending order
      },
    ]);

    // Format the response for the bar chart
    const chartData = monthlyCounts.map((entry) => ({
      month: entry._id,
      count: entry.count,
    }));

    return res.status(200).json({
      success: true,
      data: chartData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};
``;
