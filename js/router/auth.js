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
function findUserByEmail(email) {
    const users = getUsers();
    for (var i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() === email.toLowerCase()) {
            return users[i];
        }
    }
    return null;
}