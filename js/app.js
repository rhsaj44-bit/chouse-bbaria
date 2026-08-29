const app = {
    renderGrid() {
        const table = document.getElementById("room-grid");
        table.innerHTML = ""; 
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
        
        let headerRow = document.createElement("tr");
        let th = document.createElement("th");
        th.innerText = "রুম নং";
        th.style.padding = "10px";
        th.style.background = "#2c3e50";
        th.style.color = "white";
        headerRow.appendChild(th);
        
        let today = new Date();
        for(let i=0; i<7; i++) {
            let d = new Date(today);
            d.setDate(today.getDate() + i);
            let dateTh = document.createElement("th");
            dateTh.innerText = d.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short' });
            dateTh.style.padding = "10px";
            dateTh.style.background = "#34495e";
            dateTh.style.color = "white";
            headerRow.appendChild(dateTh);
        }
        table.appendChild(headerRow);

        for(let r=1; r<=20; r++) {
            let tr = document.createElement("tr");
            let roomTd = document.createElement("td");
            roomTd.innerText = "রুম " + r;
            roomTd.style.fontWeight = "bold";
            roomTd.style.padding = "10px";
            roomTd.style.border = "1px solid #ddd";
            tr.appendChild(roomTd);

            for(let d=0; d<7; d++) {
                let cellTd = document.createElement("td");
                cellTd.innerText = "খালি";
                cellTd.style.background = "#2ecc71";
                cellTd.style.color = "white";
                cellTd.style.cursor = "pointer";
                cellTd.style.padding = "10px";
                cellTd.style.border = "1px solid #ddd";
                cellTd.style.textAlign = "center";
                
                cellTd.onclick = () => app.openBookingModal(r);
                tr.appendChild(cellTd);
            }
            table.appendChild(tr);
        }
    },

    openBookingModal(roomNo) {
        document.getElementById("modal-room-title").innerText = "বুকিং: রুম " + roomNo;
        document.getElementById("modal-room-no").value = roomNo;
        document.getElementById("booking-modal").style.display = "block";
        document.getElementById("modal-overlay").style.display = "block";
    },

    closeModal() {
        document.getElementById("booking-modal").style.display = "none";
        document.getElementById("modal-overlay").style.display = "none";
        document.getElementById("guest-name").value = "";
        document.getElementById("guest-office").value = "";
    },

    async submitBooking() {
        const payload = {
            roomNo: document.getElementById("modal-room-no").value,
            guestName: document.getElementById("guest-name").value,
            office: document.getElementById("guest-office").value,
            category: document.getElementById("guest-category").value,
            payableStatus: document.getElementById("payment-status").value
        };

        if(!payload.guestName || !payload.office) {
            return alert("নাম এবং অফিস/ঠিকানা অবশ্যই দিতে হবে!");
        }

        const res = await api.request({ action: "bookRoom", payload: payload });
        
        if(res && res.success) {
            alert("বুকিং সফল হয়েছে!");
            app.closeModal();
        } else {
            alert("বুকিং ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
        }
    }
};

setTimeout(() => { app.renderGrid(); }, 500);
