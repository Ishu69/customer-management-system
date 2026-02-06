// -------- LOGIN --------
function login() {
  const username = user.value;
  const password = pass.value;

  if (username === "admin" && password === "admin123") {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid login");
  }
}

// -------- AUTH CHECK --------
function checkAuth() {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }
}

// -------- LOGOUT --------
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// -------- DASHBOARD --------
function loadDashboard() {
  checkAuth();
  const customers = getCustomers();
  document.getElementById("total").innerText = customers.length;
}

// -------- CUSTOMER DATA --------
function getCustomers() {
  return JSON.parse(localStorage.getItem("customers")) || [];
}

function saveCustomers(customers) {
  localStorage.setItem("customers", JSON.stringify(customers));
}

// -------- CUSTOMERS --------
function loadCustomers() {
  checkAuth();
  render(getCustomers());
}

function addCustomer() {
  const customers = getCustomers();

  const name = document.getElementById("customerName").value;
  const email = document.getElementById("customerEmail").value;

  if (name === "" || email === "") {
    alert("Please fill all fields");
    return;
  }

  customers.push({
    id: Date.now(),
    name: name,
    email: email
  });

  saveCustomers(customers);

  document.getElementById("customerName").value = "";
  document.getElementById("customerEmail").value = "";

  render(customers);
}

function deleteCustomer(id) {
  let customers = getCustomers();
  customers = customers.filter(c => c.id !== id);
  saveCustomers(customers);
  render(customers);
}

function searchCustomer() {
  const q = search.value.toLowerCase();
  const customers = getCustomers();

  const result = customers.filter(
    c =>
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
  );

  render(result);
}

function render(customers) {
  list.innerHTML = customers
    .map(
      c => `
      <tr>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>
          <button onclick="deleteCustomer(${c.id})">Delete</button>
        </td>
      </tr>
    `
    )
    .join("");
}
