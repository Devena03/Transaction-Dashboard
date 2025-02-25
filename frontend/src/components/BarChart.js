import React, { useState, useEffect } from "react";
import { fetchBarChart } from "../api/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./BarChartComponent.css";  

const BarChartComponent = ({ month }) => {
  const [barData, setBarData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBarChartData = async () => {
      try {
        setLoading(true);
        const data = await fetchBarChart(month);
        console.log("Fetched Bar Chart Data:", data); // Debugging
        if (Array.isArray(data)) {
          setBarData(data);
        } else {
          console.error("Invalid bar chart data format:", data);
          setBarData([]);
        }
      } catch (error) {
        console.error("Error fetching bar chart:", error);
        setBarData([]);
      } finally {
        setLoading(false);
      }
    };
    loadBarChartData();
  }, [month]);

  return (
    <div className="bar-chart-container">
      <h2 className="bar-chart-title">Bar Chart - {month}</h2>
      {loading ? (
        <p className="loading-text">Loading bar chart...</p>
      ) : barData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#ff8c00" />  
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="no-data-text">No data available for this month.</p>
      )}
    </div>
  );
};

export default BarChartComponent;
