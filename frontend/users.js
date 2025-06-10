var _a;
var usersCurrentPage = 1;
var usersLimit = 5;
var loadedUsers = [];
document.addEventListener('DOMContentLoaded', function () {
    loadUsers(usersCurrentPage);
});
function loadUsers(page) {
    var domain = document.getElementById('filterDomain').value;
    var query = "?page=".concat(page, "&usersLimit=").concat(usersLimit).concat(domain ? "&domain=".concat(encodeURIComponent(domain)) : '');
    fetch("/users/api".concat(query))
        .then(function (res) { return res.json(); })
        .then(function (data) {
        loadedUsers = data.data;
        displayUsers(loadedUsers);
        setupPagination(data.totalPages || 1);
    })
        .catch(function (err) { return console.error('❌ Fetch error:', err); });
}
function displayUsers(users) {
    var userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach(function (user) {
        var li = document.createElement('li');
        li.classList.add('user-item');
        var info = document.createElement('span');
        info.textContent = "".concat(user.name, " (").concat(user.email, ")");
        var btn = document.createElement('button');
        btn.textContent = 'View Projects';
        btn.classList.add('view-projects-btn');
        btn.onclick = function () {
            window.location.href = "projects.html?userId=".concat(user.id);
        };
        li.appendChild(info);
        li.appendChild(btn);
        userList.appendChild(li);
    });
}
function setupPagination(totalPages) {
    var pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    var prev = document.createElement('button');
    prev.textContent = 'Prev';
    prev.disabled = usersCurrentPage === 1;
    prev.onclick = function () {
        usersCurrentPage--;
        loadUsers(usersCurrentPage);
    };
    var next = document.createElement('button');
    next.textContent = 'Next';
    next.disabled = usersCurrentPage >= totalPages;
    next.onclick = function () {
        usersCurrentPage++;
        loadUsers(usersCurrentPage);
    };
    pagination.appendChild(prev);
    pagination.appendChild(document.createTextNode(" Page ".concat(usersCurrentPage, " of ").concat(totalPages, " ")));
    pagination.appendChild(next);
}
function applyFilters() {
    usersCurrentPage = 1;
    loadUsers(usersCurrentPage);
}
(_a = document.getElementById('filterDomain')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function () {
    applyFilters();
});
