var currentPage = 1;
var limit = 5;
document.addEventListener('DOMContentLoaded', function () {
    loadProjects(currentPage);
});
function loadProjects(page) {
    fetch("/projects/api?page=".concat(page, "&limit=").concat(limit))
        .then(function (res) { return res.json(); })
        .then(function (data) {
        displayProjects(data);
        setupPagination(data.length);
    })
        .catch(function (err) { return console.error('❌ Fetch error:', err); });
}
function displayProjects(users) {
    var projectList = document.getElementById('projectList');
    projectList.innerHTML = '';
    users.forEach(function (user) {
        var li = document.createElement('li');
        li.textContent = "".concat(user.name, " (").concat(user.email, ")");
        projectList.appendChild(li);
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
        loadProjects(currentPage);
    };
    var next = document.createElement('button');
    next.textContent = 'Next';
    next.disabled = count < limit;
    next.onclick = function () {
        currentPage++;
        loadProjects(currentPage);
    };
    pagination.appendChild(prev);
    pagination.appendChild(document.createTextNode(" Page ".concat(currentPage, " ")));
    pagination.appendChild(next);
}
