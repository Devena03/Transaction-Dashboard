require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const connectDB = require("./config/db");
const Transaction = require("./models/Transaction");

 
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
 
const transactionRoutes = require("./routes/transactionRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes");
const barChartRoutes = require("./routes/barChartRoutes");

app.use("/api", transactionRoutes);
app.use("/api", statisticsRoutes);
app.use("/api", barChartRoutes);
 
const initializeDatabase = async () => {
  try {
    const count = await Transaction.countDocuments();
    if (count === 0) {
      const response = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
      const transactions = response.data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        price: Number(item.price),  
        category: item.category,
        sold: item.sold.toLowerCase() === "true",  
        image: item.image,
        dateOfSale: new Date(item.dateOfSale)  
      }));

      await Transaction.insertMany(transactions);
      console.log("✅ Database initialized with transactions");
    } else {
      console.log("✅ Database already contains data, skipping initialization");
    }
  } catch (error) {
    console.error("❌ Error initializing database:", error.message);
  }
};

initializeDatabase();

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
