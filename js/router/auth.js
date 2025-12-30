function isAuthenticated() {
    return localStorage.getItem('currentUser') !== null;
}
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}
function login(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('examState');
}
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
function updateCurrentUser() {
    var currentUser = getCurrentUser();
    if (!currentUser) return null;
    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() === currentUser.email.toLowerCase()) {
            users[i] = currentUser;
            break;
        }
    }
    saveUsers(users);

    return currentUser;
}