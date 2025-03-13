
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import AddIncomeModal from "../components/Modals/addIncome";
import AddExpenseModal from "../components/Modals/addExpense";
import { addDoc, collection, query, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionTable from "../components/Transactionstable";
import DesignCharts from "../components/charts";

const NoTransactions = () => <div className="no-transactions">No transactions found. Add your first transaction to see charts!</div>;

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    if (user) fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
   
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      const transactionsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTransactions(transactionsArray);
    } catch (error) {
      toast.error("Failed to fetch transactions");
      console.error("Fetch error:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      setTransactions(prev => [...prev, { ...transaction, id: docRef.id }]);
      toast.success("Transaction added!");
    } catch (e) {
      toast.error("Error adding transaction");
      console.error("Add error:", e);
    }
  };

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach(({ type, amount }) => {
      if (type.toLowerCase() === "income") incomeTotal += amount;
      else expenseTotal += amount;
    });

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  };
  
  // Reset function
  const handleReset = () => {
    setTransactions([]);
    setIncome(0);
    setExpense(0);
    setTotalBalance(0);
    toast.info("All transactions cleared locally.");
  };

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  // Sort transactions by date
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="dashboard">
      <Header />
      {loading ? (
        <div className="loading">Loading transactions...</div>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModal={() => setIsExpenseModalVisible(true)}
            showIncomeModal={() => setIsIncomeModalVisible(true)}
            handleReset={handleReset}
          />

          {transactions.length > 0 ? (
            <>
              <TransactionTable transactions={sortedTransactions} />
              <DesignCharts sortedTransactions={sortedTransactions} />
            </>
          ) : (
            <NoTransactions />
          )}
          
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={() => setIsExpenseModalVisible(false)}
            onFinish={(values, type) => {
              addTransaction({
                ...values,
                type: "expense",
                date: values.date.format("YYYY-MM-DD"),
                amount: parseFloat(values.amount)
              });
            }}
          />

          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={() => setIsIncomeModalVisible(false)}
            onFinish={(values, type) => {
              addTransaction({
                ...values,
                type: "income",
                date: values.date.format("YYYY-MM-DD"),
                amount: parseFloat(values.amount)
              });
            }}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;