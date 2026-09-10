import { useState } from "react";
import "./index.css";

const initialExpenses = [
  {
    id: 1,
    name: "Grocery shopping",
    category: "Food",
    amount: 84.32,
    date: "2026-09-08",
  },
  {
    id: 2,
    name: "Train ticket",
    category: "Transport",
    amount: 31.50,
    date: "2026-09-06",
  },
  {
    id: 3,
    name: "Streaming subscription",
    category: "Entertainment",
    amount: 12.99,
    date: "2026-09-04",
  },
  {
    id: 4,
    name: "New sneakers",
    category: "Shopping",
    amount: 89.00,
    date: "2026-09-02",
  },
];

    
    



function App() {
  const [expenses, setExpenses] = useState(initialExpenses);

  const total = expenses.reduce(
  (sum, expense) => sum + expense.amount,
  0
);


const [showForm, setShowForm] = useState(false);

const [form, setForm] = useState({
  name: "",
  amount: "",
  category: "Food",
});

function addExpense() {
  if (!form.name || !form.amount) {
    return;
  }

  const newExpense = {
    id: Date.now(),
    name: form.name,
    category: form.category,
    amount: Number(form.amount),
    date: new Date().toISOString().split("T")[0],
  };

  setExpenses([
    ...expenses,
    newExpense
  ]);

  setForm({
    name: "",
    amount: "",
    category: "Food",
  });

  setShowForm(false);
}






  return (
    <div className="app">
      <header>
        <h1>Spendly</h1>
       
        <button className="add-button" 
         onClick={() => setShowForm(true)}>
          + Add Expense
        </button>
        {showForm && (
  <div className="modal">
    <div className="modal-content">

      <h2>Add Expense</h2>

      
      <input
  type="text"
  placeholder="Expense name"
  value={form.name}
  onChange={(e) =>
    setForm({
      ...form,
      name: e.target.value
    })
  }
/>


      <input
  type="number"
  placeholder="Amount"
  value={form.amount}
  onChange={(e) =>
    setForm({
      ...form,
      amount: e.target.value
    })
  }
/>

      <select
  value={form.category}
  onChange={(e) =>
    setForm({
      ...form,
      category: e.target.value
    })
  }
>
        <option>Food</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Entertainment</option>
        <option>Other</option>
      </select>
 <button onClick={addExpense}>
  Add Expense
</button> 
 {/* <button>Add Expence </button> */}
     

      <button onClick={() => setShowForm(false)}>
        Cancel
      </button>

    </div>
  </div>
)}


      </header>

      <main>
        <section className="welcome">
          <p>PERSONAL FINANCE</p>
          <h2>Good afternoon, Jamie.</h2>
          <span>Here’s how your spending is looking this month.</span>
        </section>

        <section className="dashboard">
          <div className="card">
            <p>Spent this month</p>
            <h3>£{total.toFixed(2)}</h3>
          </div>

          <div className="card">
            <p>Transactions</p>
            <h3>12</h3>
          </div>

          <div className="card">
            <p>Average expense</p>
            <h3>£27.73</h3>
          </div>
        </section>
        <section className="expenses">
  <div className="section-header">
    <div>
      <h2>Recent expenses</h2>
      <p>{expenses.length} transactions</p>
    </div>

    <input
      type="text"
      placeholder="Search expenses..."
    />
  </div>

  <div className="expense-list">
    {expenses.map((expense) => (
      <div className="expense" key={expense.id}>

        <div>
          <h3>{expense.name}</h3>
          <span>{expense.category}</span>
        </div>

        <div>
          <p>{expense.date}</p>
          <strong>£{expense.amount.toFixed(2)}</strong>
        </div>

      </div>
    ))}
  </div>
</section>
      </main>
    </div>
  );
}

export default App;
