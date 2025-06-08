console.log("✅ projects.ts is running");

function fetchAllProjects() {
  fetch('/projects/api')
    .then(res => res.json())
    .then(projects => {
      const list = document.getElementById('projectList')!;
      list.innerHTML = '';

      if (projects.length === 0) {
        list.innerHTML = '<li>No projects found.</li>';
        return;
      }

      projects.forEach((project: any) => {
        const li = document.createElement('li');
        li.textContent = project.name || JSON.stringify(project);
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error("❌ Error loading projects:", err);
    });
}

fetchAllProjects();