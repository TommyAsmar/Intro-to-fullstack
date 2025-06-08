let currentPage = 1;
const limit = 5;

document.addEventListener('DOMContentLoaded', () => {
  loadProjects(currentPage);
});

function loadProjects(page) {
  fetch(`/projects/api?page=${page}&limit=${limit}`)
    .then(res => res.json())
    .then(data => {
      displayProjects(data);
      setupPagination(data.length);
    })
    .catch(err => console.error('❌ Fetch error:', err));
}

function displayProjects(users) {
  const projectList = document.getElementById('projectList');
  projectList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.name} (${user.email})`;
    projectList.appendChild(li);
  });
}

function setupPagination(count) {
  const pagination = document.getElementById('pagination');
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
  next.disabled = count < limit;
  next.onclick = () => {
    currentPage++;
    loadProjects(currentPage);
  };

  pagination.appendChild(prev);
  pagination.appendChild(document.createTextNode(` Page ${currentPage} `));
  pagination.appendChild(next);
}