(() => {
    if (!authService.isAuth() || authService.isTokenExpired()) {
            authService.logout();
            alert('Log in to view your scores.');
    }
})();
