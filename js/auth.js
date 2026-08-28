const auth = {
    async login() {
        const pin = document.getElementById('pin').value;
        if (!pin) return alert("পিন দিন!");
        
        // Loader/Spinner add here
        const res = await api.request({ action: "login", pin: pin });
        
        if (res && res.success) {
            localStorage.setItem("userRole", res.role);
            localStorage.setItem("userName", res.name);
            ui.initApp(res.name, res.role);
        } else {
            alert(res.message);
        }
    },
    
    logout() {
        localStorage.clear();
        document.getElementById("pin").value = '';
        document.getElementById('app-container').classList.remove('active-view');
        document.getElementById('login-container').classList.add('active-view');
        document.getElementById('sidebar').classList.remove('open');
    }
};
