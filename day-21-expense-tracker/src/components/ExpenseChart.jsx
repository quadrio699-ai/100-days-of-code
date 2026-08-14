import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CATEGORIES } from '../constants';

const COLORS = ['#38bdf8', '#a78bfa', '#f87171', '#34d399', '#fbbf24'];

function ExpenseChart({ expenses }) {
  const data = CATEGORIES.map((category) => ({
    name: category,
    value: expenses
      .filter((e) => e.category === category)
      .reduce((sum, e) => sum + e.amount, 0),
  })).filter((entry) => entry.value > 0);

  if (data.length === 0) {
    return <p className="empty-message">Add expenses to see the breakdown.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} label>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ExpenseChart;