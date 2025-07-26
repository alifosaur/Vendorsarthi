const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalExpense = document.getElementById('total-expense');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
  expenseList.innerHTML = '';
  let total = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${expense.date}</strong> - ₹${expense.amount} [${expense.category}]
      <br>${expense.description || ''}
      <br><button onclick="deleteExpense(${index})">❌ Delete</button>
    `;
    expenseList.appendChild(li);
    total += Number(expense.amount);
  });

  totalExpense.innerText = total;
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;

  expenses.push({ date, category, amount, description });
  localStorage.setItem('expenses', JSON.stringify(expenses));
  form.reset();
  renderExpenses();
});

renderExpenses();

