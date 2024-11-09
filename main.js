// main.js

// Function to load invoices from local storage and display them on the View Invoices page
function loadInvoices() {
  const invoiceList = document.getElementById('invoice-list');
  const invoices = JSON.parse(localStorage.getItem('invoices')) || []; // Get stored invoices or an empty array if none
  invoiceList.innerHTML = ''; // Clear existing list

  if (invoices.length === 0) {
    invoiceList.innerHTML = '<p>No invoices found.</p>';
  } else {
    invoices.forEach(invoice => {
      const invoiceItem = document.createElement('div');
      invoiceItem.classList.add('invoice-item');
      invoiceItem.innerHTML = `
        <p><strong>Invoice Number:</strong> ${invoice.number}</p>
        <p><strong>Client Name:</strong> ${invoice.client}</p>
        <p><strong>Amount:</strong> $${invoice.amount}</p>
        <p><strong>Due Date:</strong> ${invoice.dueDate}</p>
        <hr>
      `;
      invoiceList.appendChild(invoiceItem);
    });
  }
}

// Handle invoice form submission and save to local storage
document.getElementById('invoice-form')?.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const invoiceNumber = document.getElementById('invoice-number').value;
  const clientName = document.getElementById('client-name').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const dueDate = document.getElementById('due-date').value;

  // Create invoice object
  const newInvoice = {
    number: invoiceNumber,
    client: clientName,
    amount: amount,
    dueDate: dueDate
  };

  // Get existing invoices from local storage or an empty array if none
  const invoices = JSON.parse(localStorage.getItem('invoices')) || [];

  // Add new invoice to the array
  invoices.push(newInvoice);

  // Save updated invoices array back to local storage
  localStorage.setItem('invoices', JSON.stringify(invoices));

  // Clear the form after submission
  document.getElementById('invoice-form').reset();

  // Optionally, redirect to the invoices page to see the newly added invoice
  window.location.href = 'invoices.html';
});

// Load the invoices when the page is loaded (for View Invoices page)
if (document.getElementById('invoice-list')) {
  loadInvoices();
}
