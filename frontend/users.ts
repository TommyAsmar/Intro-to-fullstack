let usersCurrentPage = 1;
const usersLimit = 5;

let loadedUsers: any[] = [];
document.addEventListener('DOMContentLoaded', () => {
  loadUsers(usersCurrentPage);
});

async function loadUsers(page: number) {
  const domain = (document.getElementById('filterDomain') as HTMLSelectElement).value;
  const query = `?page=${page}&usersLimit=${usersLimit}${domain ? `&domain=${encodeURIComponent(domain)}` : ''}`;

  try {
    const res = await fetch(`/users/api${query}`);
    const data = await res.json();
    loadedUsers = data.data;
    displayUsers(loadedUsers);
    setupPagination(data.totalPages || 1);
  } catch (err) {
    console.error('❌ Fetch error:', err);
  }
}

function displayUsers(users) {
  const userList = document.getElementById('userList') as HTMLUListElement;
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
  const pagination = document.getElementById('pagination' ) as HTMLDivElement;
  pagination.innerHTML = '';

  const prev = document.createElement('button');
  prev.textContent = 'Prev';
  prev.disabled = usersCurrentPage === 1;
  prev.onclick = () => {
    usersCurrentPage--;
    loadUsers(usersCurrentPage);
  };

  const next = document.createElement('button');
  next.textContent = 'Next';
  next.disabled = usersCurrentPage >= totalPages;
  next.onclick = () => {
    usersCurrentPage++;
    loadUsers(usersCurrentPage);
  };

  pagination.appendChild(prev);
  pagination.appendChild(document.createTextNode(` Page ${usersCurrentPage} of ${totalPages} `));
  pagination.appendChild(next);
}


function applyFilters() {
  usersCurrentPage = 1; 
  loadUsers(usersCurrentPage);
}

document.getElementById('filterDomain')?.addEventListener('change', () => {
  applyFilters();
});