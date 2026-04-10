const form = document.querySelector("#exceptionForm");
const tableBody = document.querySelector("#tableBody");
const filterType = document.querySelector("#filterType");
const filterStatus = document.querySelector("#filterStatus");

let issues = [];

// ADD ISSUE
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const deliveryId = document.querySelector("#deliveryId").value;
    const customerName = document.querySelector("#customerName").value;
    const issueType = document.querySelector("#issueType").value;
    const notes = document.querySelector("#notes").value;

    const priority = document.querySelector('input[name="priority"]:checked').value;

    const issue = {
        deliveryId,
        customerName,
        issueType,
        priority,
        notes,
        status: "Open"
    };

    issues.push(issue);
    renderTable();

    form.reset();
});

// RENDER TABLE
function renderTable() {
    tableBody.innerHTML = "";

    const typeFilter = filterType.value;
    const statusFilter = filterStatus.value;

    issues.forEach((issue, index) => {

        if ((typeFilter !== "All" && issue.issueType !== typeFilter) ||
            (statusFilter !== "All" && issue.status !== statusFilter)) {
            return;
        }

        const row = document.createElement("tr");

        if (issue.status === "Resolved") {
            row.classList.add("resolved");
        }

        if (issue.priority === "High") {
            row.classList.add("high");
        }

        row.innerHTML = `
            <td>${issue.deliveryId}</td>
            <td>${issue.customerName}</td>
            <td>${issue.issueType}</td>
            <td>${issue.priority}</td>
            <td>${issue.status}</td>
            <td>
                <button class="resolve" data-index="${index}">Resolve</button>
                <button class="delete" data-index="${index}">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// HANDLE ACTIONS (EVENT DELEGATION)
tableBody.addEventListener("click", function (e) {
    const index = e.target.dataset.index;

    if (e.target.classList.contains("resolve")) {
        issues[index].status = "Resolved";
        renderTable();
    }

    if (e.target.classList.contains("delete")) {
        const confirmDelete = confirm("Are you sure?");
        if (confirmDelete) {
            issues.splice(index, 1);
            renderTable();
        }
    }
});

// FILTER EVENTS
filterType.addEventListener("change", renderTable);
filterStatus.addEventListener("change", renderTable);