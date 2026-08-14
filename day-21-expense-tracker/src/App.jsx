import { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);

  function addExpense(expense) {
    setExpenses([...expenses, expense]);
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <p className="total">Total: ₦{total.toLocaleString()}</p>
      <ExpenseForm onAdd={addExpense} />
      <ExpenseList expenses={expenses} />
    </div>
  );
}

export default App;