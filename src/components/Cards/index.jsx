// import React from "react";
// import "./styles.css";
// import { Card, Row } from "antd";
// import Button from "../Button";

// function Cards({showExpenseModal,showIncomeModal,income,expense,totalBalance}) {
//   return (
//     <div>
//       <Row className="my-row">
//         <Card className="my-card">
//         <h2>Total Balance</h2>
//         <p> ₹{totalBalance}</p>
//           <Button text="Reset Balance"   blue={true}/>
//         </Card>
//         <Card className="my-card">
//         <h2>Add income</h2>
//         <p> ₹{income}</p>
         
//           <Button  text="Add Income" blue={true} onClick={showIncomeModal} />
//         </Card>
//         <Card className="my-card">
//           <h2>Add Expense</h2>
//           <p> ₹{expense}</p>
//           <Button text="Add Expense" blue={true} onClick={showExpenseModal} />
//         </Card>
//       </Row>
//     </div>
//   );
// }

// export default Cards;
import React from "react";
import "./styles.css";
import { Card, Row } from "antd";
import Button from "../Button";

function Cards({showExpenseModal, showIncomeModal, income, expense, totalBalance, handleReset}) {
  return (
    <div>
      <Row className="my-row">
        <Card className="my-card">
          <h2>Total Balance</h2>
          <p> ₹{totalBalance}</p>
          <Button text="Reset Balance" blue={true} onClick={handleReset} />
        </Card>
        <Card className="my-card">
          <h2>Add income</h2>
          <p> ₹{income}</p>
          <Button text="Add Income" blue={true} onClick={showIncomeModal} />
        </Card>
        <Card className="my-card">
          <h2>Add Expense</h2>
          <p> ₹{expense}</p>
          <Button text="Add Expense" blue={true} onClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  );
}

export default Cards;