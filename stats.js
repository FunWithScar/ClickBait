// =====================================
// Statistics System
// =====================================

const Stats = {

    lastScroll: window.scrollY,

    lastMouseX: null,
    lastMouseY: null,

    idleTimer: 0,

    hoverTimer: null,

    start() {

        this.updateUI();

        this.trackClicks();

        this.trackKeyboard();

        this.trackScroll();

        this.trackMouse();

        this.trackHover();

        this.trackPlayTime();

        this.trackVisibility();

    },

    updateUI() {

        document.getElementById("clicks").textContent =
            Game.stats.clicks;

        document.getElementById("keys").textContent =
            Game.stats.keys;

        document.getElementById("scroll").textContent =
            Math.floor(Game.stats.scroll).toLocaleString() + " px";

        document.getElementById("mouse-distance").textContent =
            Math.floor(Game.stats.mouseDistance).toLocaleString() + " px";

        document.getElementById("idle").textContent =
            Game.stats.idleTime + "s";

        const minutes =
            Math.floor(Game.stats.playTime / 60);

        const seconds =
            Game.stats.playTime % 60;

        document.getElementById("time").textContent =
            `${minutes}m ${seconds}s`;

    },

    //-----------------------------------

    trackClicks() {

        document.addEventListener("click", () => {

            Game.stats.clicks++;

            this.resetIdle();

            this.updateUI();

            if (Game.stats.clicks >= 25)
                Achievements.unlock("click25");

        });

    },

    //-----------------------------------

    trackKeyboard() {

        document.addEventListener("keydown", () => {

            Game.stats.keys++;

            this.resetIdle();

            this.updateUI();

            if (Game.stats.keys >= 100)
                Achievements.unlock("keyboard100");

        });

    },

    //-----------------------------------

    trackScroll() {

        window.addEventListener("scroll", () => {

            Game.stats.scroll +=
                Math.abs(window.scrollY - this.lastScroll);

            this.lastScroll = window.scrollY;

            this.resetIdle();

            this.updateUI();

            if (Game.stats.scroll >= 10000)
                Achievements.unlock("scroll10000");

        });

    },

    //-----------------------------------

    trackMouse() {

        document.addEventListener("mousemove", (e) => {

            this.resetIdle();

            if (this.lastMouseX === null) {

                this.lastMouseX = e.clientX;
                this.lastMouseY = e.clientY;

                return;

            }

            const dx = e.clientX - this.lastMouseX;
            const dy = e.clientY - this.lastMouseY;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            Game.stats.mouseDistance += distance;

            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;

            this.updateUI();

            if (Game.stats.mouseDistance >= 100000)
                Achievements.unlock("mouse");

        });

    },

    //-----------------------------------

    trackHover() {

        const link =
            document.getElementById("dummy-link");

        if (!link)
            return;

        link.addEventListener("mouseenter", () => {

            this.hoverTimer = setTimeout(() => {

                Achievements.unlock("hesitator");

            }, 45000);

        });

        link.addEventListener("mouseleave", () => {

            clearTimeout(this.hoverTimer);

        });

    },

    //-----------------------------------

    trackPlayTime() {

        setInterval(() => {

            Game.stats.playTime++;

            Game.stats.idleTime++;

            this.updateUI();

            if (Game.stats.playTime >= 60)
                Achievements.unlock("visitor");

            if (Game.stats.idleTime >= 300)
                Achievements.unlock("afk");

        }, 1000);

    },

    //-----------------------------------

    resetIdle() {

        Game.stats.idleTime = 0;

    },

    //-----------------------------------

    trackVisibility() {

        document.addEventListener("visibilitychange", () => {

            if (!document.hidden) {

                this.resetIdle();

            }

        });

    }

};
