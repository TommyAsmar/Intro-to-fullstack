var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var usersCurrentPage = 1;
var usersLimit = 5;
var loadedUsers = [];
document.addEventListener('DOMContentLoaded', function () {
    loadUsers(usersCurrentPage);
});
function loadUsers(page) {
    return __awaiter(this, void 0, void 0, function () {
        var domain, query, loading, res, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    domain = document.getElementById('filterDomain').value;
                    query = "?page=".concat(page, "&usersLimit=").concat(usersLimit).concat(domain ? "&domain=".concat(encodeURIComponent(domain)) : '');
                    loading = document.getElementById('loading');
                    loading.style.display = 'flex';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("/users/api".concat(query))];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    loadedUsers = data.data;
                    displayUsers(loadedUsers);
                    setupPagination(data.totalPages || 1);
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    console.error('❌ Fetch error:', err_1);
                    return [3 /*break*/, 6];
                case 5:
                    loading.style.display = 'none';
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function displayUsers(users) {
    var userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach(function (user) {
        var li = document.createElement('li');
        li.classList.add('user-item');
        var info = document.createElement('span');
        info.textContent = "".concat(user.name, " (").concat(user.email, ")");
        var btn = document.createElement('button');
        btn.textContent = 'View Projects';
        btn.classList.add('view-projects-btn');
        btn.onclick = function () {
            window.location.href = "projects.html?userId=".concat(user.id);
        };
        li.appendChild(info);
        li.appendChild(btn);
        userList.appendChild(li);
    });
}
function setupPagination(totalPages) {
    var pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    var prev = document.createElement('button');
    prev.textContent = 'Prev';
    prev.disabled = usersCurrentPage === 1;
    prev.onclick = function () {
        usersCurrentPage--;
        loadUsers(usersCurrentPage);
    };
    var next = document.createElement('button');
    next.textContent = 'Next';
    next.disabled = usersCurrentPage >= totalPages;
    next.onclick = function () {
        usersCurrentPage++;
        loadUsers(usersCurrentPage);
    };
    pagination.appendChild(prev);
    pagination.appendChild(document.createTextNode(" Page ".concat(usersCurrentPage, " of ").concat(totalPages, " ")));
    pagination.appendChild(next);
}
function applyFilters() {
    usersCurrentPage = 1;
    loadUsers(usersCurrentPage);
}
(_a = document.getElementById('filterDomain')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function () {
    applyFilters();
});
