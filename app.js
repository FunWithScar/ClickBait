// =====================================
// Gamified Nonsense
// Main Application
// =====================================

const Game = {

    stats: {
        xp: 0,
        level: 1,

        clicks: 0,
        keys: 0,

        scroll: 0,
        mouseDistance: 0,

        playTime: 0,
        idleTime: 0
    },

    unlocked: new Set()

};

// Start everything
window.addEventListener("load", () => {

    Storage.load();

    Achievements.buildList();

    Stats.start();

    XP.updateUI();

});
