

import { useState } from "react"; 
import "./index.css"; 
const initialExpenses = [ { id: 1, name: "Grocery shopping", category: "Food", amount: 84.32, date: "2026-09-08", }, 
  { id: 2, name: "Train ticket", category: "Transport", amount: 31.5, date: "2026-09-06", },
   { id: 3, name: "Streaming subscription", category: "Entertainment", amount: 12.99, date: "2026-09-04", }, 
  { id: 4, name: "New sneakers", category: "Shopping", amount: 89.0, date: "2026-09-02", }, ];
  
  function App() {
     const [expenses, setExpenses] = useState(initialExpenses); 
     const [showForm, setShowForm] = useState(false); 
    const [form, setForm] = useState({ name: "", amount: "", category: "Food", });

    const [search, setSearch] = useState(""); 
    const [categoryFilter, setCategoryFilter] = useState("All");
    const filteredExpenses = expenses.filter((expense) => { const matchesSearch = expense.name .toLowerCase() .includes(search.toLowerCase()); 
      const matchesCategory = categoryFilter === "All" || expense.category === categoryFilter; return matchesSearch && matchesCategory; });

      const total = expenses.reduce( (sum, expense) => sum + expense.amount, 0 );
      function addExpense() { 
        if (!form.name || !form.amount) { return; } 
        const newExpense = { id: Date.now(), name: form.name, category: form.category, amount: Number(form.amount), date: new Date().toISOString().split("T")[0], }; setExpenses([...expenses, newExpense]); setForm({ name: "", amount: "", category: "Food", }); 
      setShowForm(false); 
    }
    function deleteExpense(id) { setExpenses( expenses.filter((expense) => expense.id !== id) ); }

    return ( 
      <div className="app">
         <header> <h1>Spendly</h1> 
         <button className="add-button" onClick={() => setShowForm(true)} > 
         + Add Expense </button> 
         {showForm && ( 
          <div className="modal"> 
          <div className="modal-content"> 
            <h2>Add Expense</h2> 
            
            <input type="text" placeholder="Expense name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, }) } />
             <input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value, }) } /> 
             <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value, }) } > 
              <option>Food</option> 
              <option>Transport</option>
               <option>Shopping</option> 
               <option>Bills</option> 
               <option>Entertainment</option>
                <option>Other</option> 
                </select> 
                <button onClick={addExpense}> Add Expense </button> 
                <button onClick={() => setShowForm(false)}> Cancel </button>
                 </div> </div> )} </header> <main> <section className="welcome">
                   <p>PERSONAL FINANCE</p> <h2>Good afternoon, Jamie.</h2> <span> Here’s how your spending is looking this month. </span> </section>
                    <section className="dashboard"> <div className="card"> <p>Spent this month</p> <h3>£{total.toFixed(2)}</h3> </div> <div className="card"> <p>Transactions</p> <h3>{expenses.length}</h3> </div> <div className="card"> <p>Average expense</p> <h3> £ {expenses.length > 0 ? ( total / expenses.length ).toFixed(2) : "0.00"} </h3> </div> </section> 
                    <section className="expenses"> <div className="section-header"> <div> <h2>Recent expenses</h2> <p>{filteredExpenses.length} transactions</p> </div> {/* Search */} <input type="text" placeholder="Search expenses..." value={search} onChange={(e) => setSearch(e.target.value)} /> {/* Category filter */} 
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value) } > 
                      <option value="All">All Categories</option> 
                      <option value="Food">Food</option> 
                      <option value="Transport">Transport</option>
                       <option value="Shopping">Shopping</option>
                        <option value="Bills">Bills</option> 
                        <option value="Entertainment"> Entertainment </option> 
                        <option value="Other">Other</option> 
                        </select>
                         </div>
                          <div className="expense-list">
                             {filteredExpenses.length > 0 ? ( filteredExpenses.map((expense) => (
                               <div className="expense" key={expense.id} > 
                               <div>
                                 <h3>{expense.name}</h3> <span>{expense.category}</span> 
                                 </div> 
                                 <div> <p>{expense.date}</p> <strong> £{expense.amount.toFixed(2)} </strong> 
                                 </div>
                                  <button onClick={() => deleteExpense(expense.id) } > Delete </button> 
                                  </div> )) ) : ( <p>No expenses found.</p> )} </div> </section> </main> </div> ); } 
    export default App;