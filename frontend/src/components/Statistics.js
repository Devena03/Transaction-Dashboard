import React, { useState, useEffect } from "react";
import { fetchStatistics } from "../api/api";
import "./Statistics.css";  

const Statistics = ({ month }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        
        console.log("Requesting statistics for month:", month);
 
        const data = await fetchStatistics(month);
         
        console.log("Received statistics:", data);

        setStats(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setStats({ totalSales: 0, totalSoldItems: 0, totalNotSoldItems: 0 });
      }
    };
    loadStatistics();
  }, [month]);

  return (
    <div className="statistics-container">  
      <h2>Statistics - {month}</h2>
      {stats ? (
        <ul>
          <li><strong>Total Sales:</strong> ${stats.totalSales.toFixed(2)}</li>
          <li><strong>Total Sold Items:</strong> {stats.totalSoldItems}</li>
          <li><strong>Total Not Sold Items:</strong> {stats.totalNotSoldItems}</li>
        </ul>
      ) : (
        <p>Loading statistics...</p>
      )}
    </div>
  );
};

export default Statistics;
