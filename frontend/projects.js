var currentPage = 1;
var limit = 5;
document.addEventListener('DOMContentLoaded', function () {
    loadProjects(currentPage);
});
function loadProjects(page) {
    var urlParams = new URLSearchParams(window.location.search);
    var userId = urlParams.get('userId');
    var url = userId
        ? "/projects/api/user/".concat(userId, "?page=").concat(page, "&limit=").concat(limit)
        : "/projects/api?page=".concat(page, "&limit=").concat(limit);
    fetch(url)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        var projects = data.data || data; // handle both paginated and flat list
        displayProjects(projects);
        setupPagination(data.totalPages || 1);
    })
        .catch(function (err) { return console.error('❌ Fetch error:', err); });
}
function displayProjects(projects) {
    var projectList = document.getElementById('projectList');
    projectList.innerHTML = '';
    console.log("✅ Received projects:", projects);
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
