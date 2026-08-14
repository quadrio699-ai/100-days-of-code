function ExpenseList({ expenses }) {
  if (expenses.length === 0) {
    return <p className="empty-message">No expenses yet — add one above.</p>;
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <span className="expense-desc">{expense.description}</span>
          <span className="expense-category">{expense.category}</span>
          <span className="expense-amount">₦{expense.amount.toLocaleString()}</span>
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;