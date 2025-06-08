let currentPage = 1;
const limit = 5;

document.addEventListener('DOMContentLoaded', () => {
  loadUsers(currentPage);
});

function loadUsers(page) {
  fetch(`/users/api?page=${page}&limit=${limit}`)
    .then(res => res.json())
    .then(data => {
      displayUsers(data);
      setupPagination(data.length);
    })
    .catch(err => console.error('❌ Fetch error:', err));
}

function displayUsers(users) {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.name} (${user.email})`;
    userList.appendChild(li);
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
    loadUsers(currentPage);
  };

  const next = document.createElement('button');
  next.textContent = 'Next';
  next.disabled = count < limit;
  next.onclick = () => {
    currentPage++;
    loadUsers(currentPage);
  };

  pagination.appendChild(prev);
  pagination.appendChild(document.createTextNode(` Page ${currentPage} `));
  pagination.appendChild(next);
}