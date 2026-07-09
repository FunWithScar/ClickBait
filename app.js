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

    // Restore unlocked achievements

    Game.unlocked.forEach(id => {

        const achievement =
            Achievements.list.find(a => a.id === id);

        if (!achievement)
            return;

        const item =
            document.getElementById("achievement-" + id);

        if (!item)
            return;

        item.classList.remove("locked");
        item.classList.add("unlocked");
        item.innerHTML = "🏆 " + achievement.name;

    });

    Stats.start();

    XP.updateUI();

document
.getElementById("reset-progress")
.addEventListener("click",()=>{

    if(confirm("Delete ALL progress?")){

        Storage.clear();

    }

});
