import { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import { CATEGORIES } from './constants';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState('All');

  function addExpense(expense) {
    setExpenses([...expenses, expense]);
  }

  const filteredExpenses = filter === 'All'
    ? expenses
    : expenses.filter((e) => e.category === filter);

  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="app">
      <h1>Expense Tracker</h1>

      <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <p className="total">Total: ₦{total.toLocaleString()}</p>

      <ExpenseForm onAdd={addExpense} />
      <ExpenseChart expenses={filteredExpenses} />
      <ExpenseList expenses={filteredExpenses} />
    </div>
  );
}

export default App;