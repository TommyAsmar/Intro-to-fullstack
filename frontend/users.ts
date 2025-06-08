console.log("✅ users.js loaded");

fetch('/users/api')
  .then(res => res.json())
  .then(data => {
    const ul = document.getElementById('userList')!;
    ul.innerHTML = '';
    data.forEach(user => {
      const li = document.createElement('li');
      li.textContent = user.name || JSON.stringify(user);
      ul.appendChild(li);
    });
  })
  .catch(err => {
    console.error("❌ Fetch failed:", err);
  });