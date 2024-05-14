import Graph from "../../utils/Graph";
import "./Income.css";
import { useState, useEffect } from "react";
import { averageIncome } from "../../utils/api";
import { income } from "../../utils/api";
function Income() {
  const [incomeData, setData] = useState([]);
  const [totalIncome, setTotalIncome] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await averageIncome();
        setData(apiData);
        const incomeData = await income();
        setTotalIncome(incomeData);
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-income">
      <div className="income-header">
        <h2>Income</h2>
        <p>
          Last <span>30 days</span>
        </p>
        <h2>Total income: ${totalIncome.totalIncome}</h2>
      </div>
      <Graph />
      <div className="transaction-container">
        <div className="transaction-single">
          <h2>Your transactions</h2>
          <p>
            Last <span>30 days</span>
          </p>
        </div>
        <div className="transaction-single-container">
          {incomeData.map((item, index) => (
            <div className="transaction" key={index}>
              <p className="transaction-text">${item.count}</p>
              <p>{item.complaint}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Income;
