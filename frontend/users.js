var currentPage = 1;
var limit = 5;
document.addEventListener('DOMContentLoaded', function () {
    loadUsers(currentPage);
});
function loadUsers(page) {
    fetch("/users/api?page=".concat(page, "&limit=").concat(limit))
        .then(function (res) { return res.json(); })
        .then(function (data) {
        displayUsers(data);
        setupPagination(data.length);
    })
        .catch(function (err) { return console.error('❌ Fetch error:', err); });
}
function displayUsers(users) {
    var userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach(function (user) {
        var li = document.createElement('li');
        li.textContent = "".concat(user.name, " (").concat(user.email, ")");
        userList.appendChild(li);
    });
}
function setupPagination(count) {
    var pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    var prev = document.createElement('button');
    prev.textContent = 'Prev';
    prev.disabled = currentPage === 1;
    prev.onclick = function () {
        currentPage--;
        loadUsers(currentPage);
    };
    var next = document.createElement('button');
    next.textContent = 'Next';
    next.disabled = count < limit;
    next.onclick = function () {
        currentPage++;
        loadUsers(currentPage);
    };
    pagination.appendChild(prev);
    pagination.appendChild(document.createTextNode(" Page ".concat(currentPage, " ")));
    pagination.appendChild(next);
}
