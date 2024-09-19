// DOM references
const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');
const totalAmountDisplay = document.getElementById('total-amount');

// Track expenses
let expenses = [];

// Initialize Chart.js Pie Chart
let expenseChart;
const ctx = document.getElementById('expenseChart').getContext('2d');

// Initialize chart
function initializeChart() {
  expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [], // Names of expenses
      datasets: [{
        label: 'Expenses',
        data: [], // Amounts of expenses
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ],
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// Add event listener to the form
expenseForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get values from the input fields
  const expenseName = expenseNameInput.value;
  const expenseAmount = parseFloat(expenseAmountInput.value);

  if (expenseName && expenseAmount > 0) {
    // Create a new expense object
    const expense = {
      id: Date.now(),
      name: expenseName,
      amount: expenseAmount
    };

    // Add the expense to the list
    expenses.push(expense);

    // Update the UI and chart
    addExpenseToUI(expense);
    updateTotalAmount();
    updateChart();

    // Clear input fields
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
  }
});

// Function to add an expense to the UI
function addExpenseToUI(expense) {
  const li = document.createElement('li');
  li.innerHTML = `${expense.name} - $${expense.amount.toFixed(2)} 
                  <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>`;
  li.setAttribute('data-id', expense.id);
  expenseList.appendChild(li);
}

// Function to update the total amount
function updateTotalAmount() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalAmountDisplay.textContent = total.toFixed(2);
}

// Function to delete an expense
function deleteExpense(id) {
  // Remove the expense from the array
  expenses = expenses.filter(expense => expense.id !== id);

  // Remove the expense from the UI
  const expenseItem = document.querySelector(`li[data-id='${id}']`);
  expenseList.removeChild(expenseItem);

  // Update the total amount and chart
  updateTotalAmount();
  updateChart();
}

// Function to update the pie chart
function updateChart() {
  const labels = expenses.map(expense => expense.name);
  const data = expenses.map(expense => expense.amount);

  expenseChart.data.labels = labels;
  expenseChart.data.datasets[0].data = data;
  expenseChart.update();
}

// Initialize chart on page load
initializeChart();
