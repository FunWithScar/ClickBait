// =====================================
// Popup System
// =====================================

const Popup = {

    queue: [],

    showing: false,

    show(title, description) {

        this.queue.push({
            title,
            description
        });

        if (!this.showing) {
            this.next();
        }

    },

    next() {

        if (this.queue.length === 0) {

            this.showing = false;

            return;

        }

        this.showing = true;

        const achievement = this.queue.shift();

        const toast = document.getElementById("toast");
        const toastTitle = document.getElementById("toast-title");
        const toastDescription = document.getElementById("toast-description");

        toastTitle.textContent = achievement.title;
        toastDescription.textContent = achievement.description;

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {

                this.next();

            }, 400);

        }, 3500);

    }

};
