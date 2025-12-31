guardRoute();

// handles bfcache
window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        if (!guardRoute()) {
            document.body.classList.add('opacity-0');
        }
    }
});

if (isProtectedRoute()) {
    window.addEventListener('unload', function () { });
}

if (getCurrentPage() === '') {
    to('/register/');
}