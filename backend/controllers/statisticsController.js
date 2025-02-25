const Transaction = require("../models/Transaction");

const monthToNumber = {
  January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
  July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
};

exports.getStatistics = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month || !monthToNumber[month]) {
      return res.status(400).json({ error: "Invalid month" });
    }

    console.log("Fetching statistics for month:", month);

    const monthNumber = monthToNumber[month];

     
    const startDate = new Date(Date.UTC(2022, monthNumber - 1, 1, 0, 0, 0, 0));    
    console.log("Start Date (UTC):", startDate.toISOString());
 
    const endDate = new Date(Date.UTC(2022, monthNumber, 1, 0, 0, 0, 0));   
    endDate.setMilliseconds(endDate.getMilliseconds() - 1);    
    console.log("End Date (UTC):", endDate.toISOString());
 
    const transactions = await Transaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate }
    });
 
    console.log("Number of transactions found:", transactions.length);
    transactions.forEach(t => console.log(t.dateOfSale));

    if (transactions.length === 0) {
      console.log("No transactions found for this month.");
    } 

    const totalSales = transactions
      .filter(t => t.sold)  
      .reduce((sum, t) => sum + t.price, 0);

    const totalSoldItems = transactions.filter(t => t.sold).length;
    const totalNotSoldItems = transactions.length - totalSoldItems;

    console.log("Total Sales (Fixed):", totalSales);
    console.log("Total Sold Items:", totalSoldItems);
    console.log("Total Not Sold Items:", totalNotSoldItems);

    res.json({
      totalSales,
      totalSoldItems,
      totalNotSoldItems,
    });

  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
