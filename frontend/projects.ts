let currentPage = 1;
const limit = 5;
let currentSort = 'asc'; // default sort order

document.addEventListener('DOMContentLoaded', () => {
  loadProjects(currentPage);
  document.getElementById('sortSelect')?.addEventListener('change', applySort);
});

function loadProjects(page: number) {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');

  const url = userId
    ? `/projects/api/user/${userId}?page=${page}&limit=${limit}&sort=${currentSort}`
    : `/projects/api?page=${page}&limit=${limit}&sort=${currentSort}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const projects = data.data || data;
      displayProjects(projects);
      setupPagination(data.totalPages || 1);
    })
    .catch(err => console.error('❌ Fetch error:', err));
}

function displayProjects(projects: any[]) {
  const projectList = document.getElementById('projectList')!;
  projectList.innerHTML = '';

  projects.forEach(project => {
    const li = document.createElement('li');
    li.textContent = `${project.name} (User ID: ${project.userId})`;
    projectList.appendChild(li);
  });
}

function setupPagination(totalPages: number) {
  const pagination = document.getElementById('pagination')!;
  pagination.innerHTML = '';

  const prev = document.createElement('button');
  prev.textContent = 'Prev';
  prev.disabled = currentPage === 1;
  prev.onclick = () => {
    currentPage--;
    loadProjects(currentPage);
  };

  const next = document.createElement('button');
  next.textContent = 'Next';
  next.disabled = currentPage >= totalPages;
  next.onclick = () => {
    currentPage++;
    loadProjects(currentPage);
  };

  pagination.appendChild(prev);
  pagination.appendChild(document.createTextNode(` Page ${currentPage} of ${totalPages} `));
  pagination.appendChild(next);
}

function applySort() {
  const select = document.getElementById('sortSelect') as HTMLSelectElement;
  currentSort = select.value;
  currentPage = 1;
  loadProjects(currentPage);
}