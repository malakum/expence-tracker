# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

Spendly
Spendly is a modern personal finance tracker built with React. It allows users to add, edit, delete, search, and filter expenses while providing visual spending insights through charts.

Expense data is automatically saved in the browser using localStorage, so your data remains available after refreshing the page.
Features
Add new expenses
Edit existing expenses
Delete expenses
Search expenses by name
Filter expenses by category
Automatically calculate:
Total spending
Number of transactions
Average expense
Save expense data using localStorage
Monthly spending bar chart
Category spending doughnut chart
Responsive design for:
Desktop
Tablet
Mobile
Modern expense dashboard
Expense date selection
Category-based expense icons
🛠️ Technologies Used
React
JavaScript
CSS
Recharts
Browser localStorage
Vite
📋 Prerequisites

Before running the project, make sure you have installed:

Node.js
npm

You can check your installed versions with:

node -v
npm -v
🚀 Installation
1. Clone the project

If the project is stored in Git:

git clone <your-repository-url>

Then move into the project folder:

cd spendly

If you already have the project folder, simply open it in your code editor.

2. Install dependencies

Run:

npm install
3. Install Recharts

Spendly uses Recharts for the monthly and category spending charts.

Run:

npm install recharts


------- Run the Application

Start the development server:

npm run dev

Vite will display a local development URL in the terminal.

Open that URL in your browser.
-------------
Project Structure

A typical project structure looks like this:

spendly/
│
├── public/
│
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
└── README.md
💾 How localStorage Works

Spendly stores expenses in the browser's localStorage.

The application uses the following storage key:

spendly-expenses

Whenever an expense is added, edited, or deleted, the updated expense list is saved automatically.

For example:

localStorage.setItem(
  "spendly-expenses",
  JSON.stringify(expenses)
);

When the application starts, it retrieves the saved data:

const savedExpenses =
  localStorage.getItem("spendly-expenses");
Important

The data is stored only in the current browser/device.

It is not stored in a database and is not automatically synchronized between different devices or browsers.

➕ Adding an Expense
Click + Add Expense.
Enter the expense name.
Enter the amount.
Select a category.
Select the date.
Click Add Expense.

The new expense will immediately appear in the expense list.

The dashboard and charts will also update automatically.

✏️ Editing an Expense

To edit an existing expense:

Find the expense in the list.
Click Edit.
Update the name, amount, category, or date.
Click Save Changes.

The existing expense will be updated rather than creating a new expense.

🗑️ Deleting an Expense

To remove an expense:

Find the expense.
Click Delete.

The expense will be removed from the list and localStorage.

The dashboard totals and charts will update automatically.

🔎 Searching Expenses

Use the Search expenses... input to search by expense name.

For example:

Search: grocery

This will display matching expenses such as:

Grocery shopping

The search is case-insensitive.

🏷️ Filtering by Category

Use the category dropdown to filter expenses.

Available categories:

All Categories
Food
Transport
Shopping
Bills
Entertainment
Other

The search and category filter can also be used together.

For example:

Search: ticket
Category: Transport

will show only transport expenses containing "ticket".

📊 Monthly Spending Chart

The Monthly spending chart groups expenses by month.

For example:

Sep 2026 → £217.81
Oct 2026 → £150.50
Nov 2026 → £325.20

The chart automatically updates whenever expenses are added, edited, or deleted.

🥧 Category Spending Chart

The Category spending chart shows how total spending is distributed across categories.

Example:

Food           £84.32
Transport      £31.50
Shopping       £89.00
Entertainment  £12.99

The chart is generated dynamically from the current expense data.


-------------------
Build for Production

To create a production build:

npm run build

The production files will normally be generated in:

dist/

To preview the production build locally: