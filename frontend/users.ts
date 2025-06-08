let currentPage = 1;
const limit = 5;

let loadedUsers: any[] = [];
document.addEventListener('DOMContentLoaded', () => {
  loadUsers(currentPage);
});

function loadUsers(page: number) {
  const domain = (document.getElementById('filterDomain') as HTMLSelectElement).value;
  const query = `?page=${page}&limit=${limit}${domain ? `&domain=${encodeURIComponent(domain)}` : ''}`;

  fetch(`/users/api${query}`)
    .then(res => res.json())
    .then(data => {
      loadedUsers = data.data;
      displayUsers(loadedUsers);
      setupPagination(data.totalPages || 1);
    })
    .catch(err => console.error('❌ Fetch error:', err));
}

function displayUsers(users) {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.classList.add('user-item');

    const info = document.createElement('span');
    info.textContent = `${user.name} (${user.email})`;

    const btn = document.createElement('button');
    btn.textContent = 'View Projects';
    btn.classList.add('view-projects-btn');
    btn.onclick = () => {
      window.location.href = `projects.html?userId=${user.id}`;
    };

    li.appendChild(info);
    li.appendChild(btn);
    userList.appendChild(li);
  });
}

function setupPagination(totalPages: number) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const prev = document.createElement('button');
  prev.textContent = 'Prev';
  prev.disabled = currentPage === 1;
  prev.onclick = () => {
    currentPage--;
    loadUsers(currentPage);
  };

  const next = document.createElement('button');
  next.textContent = 'Next';
  next.disabled = currentPage >= totalPages;
  next.onclick = () => {
    currentPage++;
    loadUsers(currentPage);
  };

  pagination.appendChild(prev);
  pagination.appendChild(document.createTextNode(` Page ${currentPage} of ${totalPages} `));
  pagination.appendChild(next);
}


function applyFilters() {
  currentPage = 1; 
  loadUsers(currentPage);
}

document.getElementById('filterDomain')?.addEventListener('change', () => {
  applyFilters();
});