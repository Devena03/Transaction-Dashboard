import React, { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import "./App.css"

const App = () => {
  const [month, setMonth] = useState("March");  

  return (
    <div>
      <h1>Transactions Dashboard</h1>
      <div className="head">
      <label>Select Month: </label>
      <select onChange={(e) => setMonth(e.target.value)} value={month}>
        <option>January</option>
        <option>February</option>
        <option>March</option>
        <option>April</option>
        <option>May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        
      </select>
      </div>

      <Statistics month={month} />
      <TransactionsTable month={month} />
      <BarChart month={month} />
    </div>
  );
};

export default App;
