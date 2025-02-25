const Transaction = require("../models/Transaction");

const monthToNumber = {
  January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
  July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
};

exports.getBarChart = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month || !monthToNumber[month]) {
      return res.status(400).json({ error: "Invalid month" });
    }

    console.log("Fetching bar chart for month:", month);    

    const monthNumber = monthToNumber[month];

    
    const startDate = new Date(2022, monthNumber - 1, 1);  
    const endDate = new Date(2022, monthNumber, 1);  

    console.log("Start Date:", startDate, "End Date:", endDate);   

    const transactions = await Transaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate }
    });

    const priceRanges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "800+", min: 801, max: Infinity },
    ];

    const barChartData = priceRanges.map(({ range, min, max }) => ({
      range,
      count: transactions.filter(t => t.price >= min && t.price <= max).length
    }));

    console.log("Bar Chart Data:", barChartData);   

    res.json(barChartData);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
