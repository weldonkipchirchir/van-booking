import Graph from "../../utils/Graph";
import "./Income.css";
function Income() {
  return (
    <div className="container-income">
      <div className="income-header">
        <h2>Income</h2>
        <p>
          Last <span>30 days</span>
        </p>
        <h2>$2,260</h2>
      </div>
      <Graph />
      <div className="transaction-container">
        <div className="transaction-single">
          <h2>Your transactions (3)</h2>
          <p>
            Last <span>30 days</span>
          </p>
        </div>
        <div className="transaction-single-container">
        <div className="transaction">
          <p className="transaction-text">$1,260</p>
          <p>Jan 15- 22</p>
        </div>
        <div className="transaction">
          <p className="transaction-text">$260</p>
          <p>Feb 15- 22</p>
        </div>
        <div className="transaction">
          <p className="transaction-text">$1,760</p>
          <p>Mar 15- 22</p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Income;
