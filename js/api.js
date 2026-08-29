// Apps Script-এর Web App URL এখানে বসান
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbynFzoGCFwEU9FbXJcEaLSxiv74VpLOHTsx5JzDPfAqW0iTgTgaXyZVF-VZwwUJw58/exec";

const api = {
    async request(payload) {
        try {
            const response = await fetch(SCRIPT_URL, {
                method: "POST",
                headers: {
                    "Content-type": "text/plain;charset=utf-8"
                body: JSON.stringify(payload)
            });
            return await response.json();
        } catch (error) {
            console.error("API Error:", error);
            alert("সার্ভার কানেকশন এরর!");
        }
    }
};
