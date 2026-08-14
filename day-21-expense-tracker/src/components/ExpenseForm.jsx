import { useState } from 'react';
import { CATEGORIES } from '../constants';

function ExpenseForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim() || !amount) return;

    onAdd({
      id: Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      category,
    });

    setDescription('');
    setAmount('');
    setCategory(CATEGORIES[0]);
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount (₦)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0"
        step="0.01"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default ExpenseForm;