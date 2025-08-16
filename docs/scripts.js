// Temporary mock data for dashboard
const sampleProducts = [
    { id: 1, name: "Laptop", category: "Electronics", quantity: 5, price: 500, days_left: 2 },
    { id: 2, name: "Mouse", category: "Accessories", quantity: 50, price: 10, days_left: 30 }
];

// Render products on dashboard
if (document.getElementById("productTable")) {
    const table = document.getElementById("productTable");
    sampleProducts.forEach(p => {
        const row = document.createElement("tr");
        if (p.days_left <= 5) row.classList.add("low-stock");
        row.innerHTML = `
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>${p.quantity}</td>
            <td>$${p.price}</td>
            <td>${p.days_left} days</td>
        `;
        table.appendChild(row);
    });
}

// Mock login
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", e => {
        e.preventDefault();
        window.location.href = "dashboard.html";
    });
}

// Mock sales form
if (document.getElementById("salesForm")) {
    document.getElementById("salesForm").addEventListener("submit", e => {
        e.preventDefault();
        alert("Sale recorded (mock)");
    });
}

// Logout
function logout() {
    window.location.href = "index.html";
}
