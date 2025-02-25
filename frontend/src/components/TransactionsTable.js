import React, { useState, useEffect } from "react";
import { fetchTransactions } from "../api/api";
import "./TransactionsTable.css";  

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      const data = await fetchTransactions(month);
      setTransactions(data);
    };
    loadTransactions();
  }, [month]);

  return (
    <div className="transactions-container">
      <h2 className="transactions-title">Transactions Table</h2>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>${transaction.price}</td>
                <td>{transaction.category}</td>
                <td>{transaction.sold ? "Yes" : "No"}</td>
                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
