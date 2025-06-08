var currentPage = 1;
var limit = 5;
document.addEventListener('DOMContentLoaded', function () {
    loadUsers(currentPage);
});
function loadUsers(page) {
    fetch("/users/api?page=".concat(page, "&limit=").concat(limit))
        .then(function (res) { return res.json(); })
        .then(function (data) {
        displayUsers(data.data);
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
    prev.disabled = currentPage === 1;
    prev.onclick = function () {
        currentPage--;
        loadUsers(currentPage);
    };
    var next = document.createElement('button');
    next.textContent = 'Next';
    next.disabled = currentPage >= totalPages;
    next.onclick = function () {
        currentPage++;
        loadUsers(currentPage);
    };
    pagination.appendChild(prev);
    pagination.appendChild(document.createTextNode(" Page ".concat(currentPage, " of ").concat(totalPages, " ")));
    pagination.appendChild(next);
}
