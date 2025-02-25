const Transaction = require("../models/Transaction");


exports.getTransactions = async (req, res) => {
  try {
    const { month, search = "", page = 1, perPage = 10 } = req.query;

    if (!month) {
      return res.status(400).json({ error: "Month is required" });
    }
 
    const monthNumber = new Date(`${month} 1, 2023`).getMonth() + 1;
 
    const query = {
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
    };
 
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { price: { $regex: search, $options: "i" } }
      ];
    }
 
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    res.json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
