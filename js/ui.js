const ui = {
    initApp(name, role) {
        document.getElementById('login-container').classList.remove('active-view');
        document.getElementById('app-container').classList.add('active-view');
        document.getElementById('user-name').innerText = name;
        
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => el.style.display = (role === 'Admin') ? 'block' : 'none');
    },

    toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('open');
    },

    showView(viewId) {
        document.querySelectorAll('main .view').forEach(v => v.classList.remove('active-view'));
        document.getElementById(viewId).classList.add('active-view');
        this.toggleSidebar(); // Close sidebar after click
    }
};
