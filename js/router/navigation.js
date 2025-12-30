var routes = {
    public: ['', 'register', 'signin', '404'],
    protected: ['start-exam', 'exam', 'time-out', 'result'],
    authRedirect: '/signin/',
    homeRedirect: '/start-exam/',
    notFoundRedirect: '/404/',
};

function to(path) {
    window.location.href = path;
}
function replace(path) {
    window.location.replace(path);
}
function getCurrentPage() {
    return window.location.pathname.replace(/\/$/, '').split('/').pop();
}
function isProtectedRoute() {
    return routes.protected.includes(getCurrentPage());
}
function isPublicRoute() {
    return routes.public.includes(getCurrentPage());
}
function isPageExists() {
    return routes.public.includes(getCurrentPage()) || routes.protected.includes(getCurrentPage());
}
function isAuthPage() {
    return getCurrentPage() === 'signin' || getCurrentPage() === 'register';
}
function is404Page() {
    return getCurrentPage() === '404';
}
function isTakenExam() {
    var currentUser = getCurrentUser();
    return currentUser && currentUser.examStatus === 'finished';
}
function isExamStarted() {
    var currentUser = getCurrentUser();
    return currentUser && currentUser.examStatus === 'active';
}
function guardRoute() {
    var authenticated = isAuthenticated();
    var currentPage = getCurrentPage();
    
    if (is404Page()) {
        return true;
    }
    if (!isPageExists()) {
        replace(routes.notFoundRedirect);
        return false;
    }
    if (isProtectedRoute() && !authenticated) {
        replace(routes.authRedirect);
        return false;
    }
    if (isAuthPage() && authenticated) {
        replace(routes.homeRedirect);
        return false;
    }
    if (currentPage === 'start-exam' && isTakenExam()) {
        replace('/result/');
        return false;
    }
    if( (currentPage === 'result' || currentPage === 'time-out') && !isTakenExam()) {
        replace('/start-exam/');
        return false;
    }
    if ((currentPage === 'exam') && !isExamStarted()) {
        replace('/start-exam/');
        return false;
    }
    if (isExamStarted() && currentPage !== 'exam') {
        replace('/exam/');
        return false;
    }
    return true;
}
function signOutAndRedirect() {
    logout();
    replace(routes.authRedirect);
}
function showPage() {
    document.body.classList.remove('opacity-0');
}