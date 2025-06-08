console.log("✅ projects.ts is running");
function fetchAllProjects() {
    fetch('/projects/api')
        .then(function (res) { return res.json(); })
        .then(function (projects) {
        var list = document.getElementById('projectList');
        list.innerHTML = '';
        if (projects.length === 0) {
            list.innerHTML = '<li>No projects found.</li>';
            return;
        }
        projects.forEach(function (project) {
            var li = document.createElement('li');
            li.textContent = project.name || JSON.stringify(project);
            list.appendChild(li);
        });
    })
        .catch(function (err) {
        console.error("❌ Error loading projects:", err);
    });
}
fetchAllProjects();
