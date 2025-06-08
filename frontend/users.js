console.log("✅ users.js loaded");
fetch('/users/api')
    .then(function (res) { return res.json(); })
    .then(function (data) {
    var ul = document.getElementById('userList');
    ul.innerHTML = '';
    data.forEach(function (user) {
        var li = document.createElement('li');
        li.textContent = user.name || JSON.stringify(user);
        ul.appendChild(li);
    });
})
    .catch(function (err) {
    console.error("❌ Fetch failed:", err);
});
