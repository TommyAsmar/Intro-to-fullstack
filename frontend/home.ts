async function fetchUsers() {
  const res = await fetch('http://localhost:8000/users');
  const users = await res.json();

  const ul = document.getElementById('users')!;
  ul.innerHTML = '';

  users.forEach((user: any) => {
    const li = document.createElement('li');
    li.textContent = `${user.name} (${user.email})`;
    li.onclick = () => fetchProjects(user.id);
    ul.appendChild(li);
  });
}

async function fetchProjects(userId: number) {
  const res = await fetch(`http://localhost:8000/users/${userId}/projects`);
  const projects = await res.json();

  const ul = document.getElementById('projects')!;
  ul.innerHTML = '';

  projects.forEach((p: any) => {
    const li = document.createElement('li');
    li.textContent = p.name;
    ul.appendChild(li);
  });
}

fetchUsers(); // Load projects for user ID 1 by default