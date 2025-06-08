var currentPage = 1;
var limit = 5;
var currentSort = 'asc'; // default sort order
document.addEventListener('DOMContentLoaded', function () {
    var _a;
    loadProjects(currentPage);
    (_a = document.getElementById('sortSelect')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', applySort);
});
function loadProjects(page) {
    var urlParams = new URLSearchParams(window.location.search);
    var userId = urlParams.get('userId');
    var url = userId
        ? "/projects/api/user/".concat(userId, "?page=").concat(page, "&limit=").concat(limit, "&sort=").concat(currentSort)
        : "/projects/api?page=".concat(page, "&limit=").concat(limit, "&sort=").concat(currentSort);
    fetch(url)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        var projects = data.data || data;
        displayProjects(projects);
        setupPagination(data.totalPages || 1);
    })
        .catch(function (err) { return console.error('❌ Fetch error:', err); });
}
function displayProjects(projects) {
    var projectList = document.getElementById('projectList');
    projectList.innerHTML = '';
    projects.forEach(function (project) {
        var li = document.createElement('li');
        li.textContent = "".concat(project.name, " (User ID: ").concat(project.userId, ")");
        projectList.appendChild(li);
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
        loadProjects(currentPage);
    };
    var next = document.createElement('button');
    next.textContent = 'Next';
    next.disabled = currentPage >= totalPages;
    next.onclick = function () {
        currentPage++;
        loadProjects(currentPage);
    };
    pagination.appendChild(prev);
    pagination.appendChild(document.createTextNode(" Page ".concat(currentPage, " of ").concat(totalPages, " ")));
    pagination.appendChild(next);
}
function applySort() {
    var select = document.getElementById('sortSelect');
    currentSort = select.value;
    currentPage = 1;
    loadProjects(currentPage);
}
