



import { useEffect, useMemo, useState } from "react";
import "./index.css";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

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
    amount: 31.5,
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
    amount: 89,
    date: "2026-09-02",
  },
];

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other",
];

function App() {
  // --------------------------------
  // EXPENSE DATA
  // --------------------------------

  const [expenses, setExpenses] = useState(() => {
    try {
      const savedExpenses = localStorage.getItem("spendly-expenses");

      return savedExpenses
        ? JSON.parse(savedExpenses)
        : initialExpenses;
    } catch {
      return initialExpenses;
    }
  });

  // Save whenever expenses change
  useEffect(() => {
    localStorage.setItem(
      "spendly-expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  // --------------------------------
  // FORM STATE
  // --------------------------------

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  // --------------------------------
  // SEARCH & FILTER
  // --------------------------------

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch = expense.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        expense.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [expenses, search, categoryFilter]);

  // --------------------------------
  // DASHBOARD CALCULATIONS
  // --------------------------------

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const average =
    expenses.length > 0 ? total / expenses.length : 0;

  // --------------------------------
  // ADD / EDIT EXPENSE
  // --------------------------------

  function openAddForm() {
    setEditingId(null);

    setForm({
      name: "",
      amount: "",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
    });

    setShowForm(true);
  }

  function openEditForm(expense) {
    setEditingId(expense.id);

    setForm({
      name: expense.name,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date,
    });

    setShowForm(true);
  }

  function saveExpense() {
    if (!form.name.trim() || !form.amount) {
      return;
    }

    const expenseData = {
      name: form.name.trim(),
      category: form.category,
      amount: Number(form.amount),
      date: form.date,
    };

    if (editingId !== null) {
      // EDIT EXISTING EXPENSE
      setExpenses((currentExpenses) =>
        currentExpenses.map((expense) =>
          expense.id === editingId
            ? {
                ...expense,
                ...expenseData,
              }
            : expense
        )
      );
    } else {
      // ADD NEW EXPENSE
      const newExpense = {
        id: Date.now(),
        ...expenseData,
      };

      setExpenses((currentExpenses) => [
        ...currentExpenses,
        newExpense,
      ]);
    }

    closeForm();
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
  }

  // --------------------------------
  // DELETE EXPENSE
  // --------------------------------

  function deleteExpense(id) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter(
        (expense) => expense.id !== id
      )
    );
  }

  // --------------------------------
  // MONTHLY CHART DATA
  // --------------------------------

  const monthlyData = useMemo(() => {
    const months = {};

    expenses.forEach((expense) => {
      const month = expense.date.slice(0, 7);

      if (!months[month]) {
        months[month] = 0;
      }

      months[month] += expense.amount;
    });

    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, amount]) => ({
        month: new Date(`${month}-01`).toLocaleDateString(
          "en-GB",
          {
            month: "short",
            year: "numeric",
          }
        ),
        amount: Number(amount.toFixed(2)),
      }));
  }, [expenses]);

  // --------------------------------
  // CATEGORY CHART DATA
  // --------------------------------

  const categoryData = useMemo(() => {
    const categoryTotals = {};

    expenses.forEach((expense) => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }

      categoryTotals[expense.category] += expense.amount;
    });

    return Object.entries(categoryTotals).map(
      ([category, amount]) => ({
        category,
        amount: Number(amount.toFixed(2)),
      })
    );
  }, [expenses]);

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <div className="app">
      {/* HEADER */}

      <header className="topbar">
        <div className="logo">
          <div className="logo-icon">S</div>

          <div>
            <h1>Spendly</h1>
            <span>Personal finance</span>
          </div>
        </div>

        <button
          className="add-button"
          onClick={openAddForm}
        >
          + Add Expense
        </button>
      </header>

      <main>
        {/* WELCOME */}

        <section className="welcome">
          <p>PERSONAL FINANCE</p>

          <h2>Good afternoon, Mala.</h2>

          <span>
            Here’s how your spending is looking this month.
          </span>
        </section>

        {/* DASHBOARD CARDS */}

        <section className="dashboard">
          <div className="card">
            <span className="card-label">
              Spent this month
            </span>

            <h3>£{total.toFixed(2)}</h3>

            <small>Total spending</small>
          </div>

          <div className="card">
            <span className="card-label">
              Transactions
            </span>

            <h3>{expenses.length}</h3>

            <small>All expenses</small>
          </div>

          <div className="card">
            <span className="card-label">
              Average expense
            </span>

            <h3>£{average.toFixed(2)}</h3>

            <small>Per transaction</small>
          </div>
        </section>

        {/* CHARTS */}

        <section className="charts-grid">
          {/* MONTHLY CHART */}

          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h2>Monthly spending</h2>
                <p>Your spending over time</p>
              </div>
            </div>

            <div className="chart">
              {monthlyData.length > 0 ? (
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart data={monthlyData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis dataKey="month" />

                    <YAxis
                      tickFormatter={(value) =>
                        `£${value}`
                      }
                    />

                    <Tooltip
                      formatter={(value) => [
                        `£${Number(value).toFixed(2)}`,
                        "Spent",
                      ]}
                    />

                    <Bar
                      dataKey="amount"
                      name="Spending"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="empty-chart">
                  No spending data yet.
                </div>
              )}
            </div>
          </div>

          {/* CATEGORY CHART */}

          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h2>Category spending</h2>
                <p>Where your money is going</p>
              </div>
            </div>

            <div className="chart pie-chart">
              {categoryData.length > 0 ? (
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="amount"
                      nameKey="category"
                      cx="50%"
                      cy="45%"
                      outerRadius={90}
                      innerRadius={50}
                      paddingAngle={3}
                    >
                      {categoryData.map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={`hsl(${
                              index * 55 + 10
                            }, 70%, 55%)`}
                          />
                        )
                      )}
                    </Pie>

                    <Tooltip
                      formatter={(value) => [
                        `£${Number(value).toFixed(2)}`,
                        "Spent",
                      ]}
                    />

                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="empty-chart">
                  No spending data yet.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* EXPENSES */}

        <section className="expenses">
          <div className="section-header">
            <div>
              <h2>Recent expenses</h2>

              <p>
                {filteredExpenses.length} transactions
              </p>
            </div>

            <div className="filters">
              <input
                type="text"
                placeholder="Search expenses..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value)
                }
              >
                <option value="All">
                  All Categories
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="expense-list">
            {filteredExpenses.length > 0 ? (
              filteredExpenses
                .slice()
                .sort((a, b) =>
                  b.date.localeCompare(a.date)
                )
                .map((expense) => (
                  <div
                    className="expense"
                    key={expense.id}
                  >
                    <div className="expense-info">
                      <div className="expense-icon">
                        {expense.category === "Food"
                          ? "🍔"
                          : expense.category ===
                            "Transport"
                          ? "🚆"
                          : expense.category ===
                            "Shopping"
                          ? "🛍️"
                          : expense.category ===
                            "Bills"
                          ? "📄"
                          : expense.category ===
                            "Entertainment"
                          ? "🎬"
                          : "💰"}
                      </div>

                      <div>
                        <h3>{expense.name}</h3>

                        <span>
                          {expense.category}
                        </span>
                      </div>
                    </div>

                    <div className="expense-date">
                      {new Date(
                        expense.date
                      ).toLocaleDateString("en-GB")}
                    </div>

                    <strong className="expense-amount">
                      £{expense.amount.toFixed(2)}
                    </strong>

                    <div className="expense-actions">
                      <button
                        className="edit-button"
                        onClick={() =>
                          openEditForm(expense)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          deleteExpense(expense.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <div className="no-expenses">
                <h3>No expenses found</h3>

                <p>
                  Try changing your search or category
                  filter.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ADD / EDIT MODAL */}

      {showForm && (
        <div
          className="modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeForm();
            }
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h2>
                  {editingId !== null
                    ? "Edit Expense"
                    : "Add Expense"}
                </h2>

                <p>
                  {editingId !== null
                    ? "Update your expense details."
                    : "Add a new expense to your account."}
                </p>
              </div>

              <button
                className="close-button"
                onClick={closeForm}
              >
                ×
              </button>
            </div>

            <label>Expense name</label>

            <input
              type="text"
              placeholder="e.g. Grocery shopping"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <label>Amount</label>

            <div className="amount-input">
              <span>£</span>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) =>
                  setForm({
                    ...form,
                    amount: e.target.value,
                  })
                }
              />
            </div>

            <label>Category</label>

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            <label>Date</label>

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value,
                })
              }
            />

            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={closeForm}
              >
                Cancel
              </button>

              <button
                className="save-button"
                onClick={saveExpense}
              >
                {editingId !== null
                  ? "Save Changes"
                  : "Add Expense"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;