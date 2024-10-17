const Transaction = require("../../../model/Purchase.js");

module.exports.transactionsTable = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const transactionsTable = [];
    const promises = transactions.map(async (trans) => {
      const buyerResponse = await fetch(
        `http://localhost:2012/api/profile/${trans.buyerId}`
      );
      const buyerData = await buyerResponse.json();
      const buyerName = buyerData.username;

      const propertyResponse = await fetch(
        `http://localhost:2012/api/property/${trans.propertyId}`
      );
      const propertyData = await propertyResponse.json();
      const propertyName = propertyData.propertyName;

      transactionsTable.push({
        buyerName,
        propertyName,
        purchaseDate: trans.purchaseDate,
        purchasePrice: trans.purchasePrice,
      });
    });

    await Promise.all(promises);

    return res.status(200).json({
      success: true,
      transactionsTable,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};
