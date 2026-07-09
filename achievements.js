// =====================================
// Achievement System
// =====================================

const Achievements = {

    list: [

        {
            id: "hesitator",
            name: "The Hesitator",
            description: "Hovered over a link for 45 seconds.",
            xp: 25,
            hidden: false
        },

        {
            id: "click25",
            name: "Click Addict",
            description: "Clicked 25 times.",
            xp: 25,
            hidden: false
        },

        {
            id: "keyboard100",
            name: "Keyboard Warrior",
            description: "Pressed 100 keys.",
            xp: 25,
            hidden: false
        },

        {
            id: "scroll10000",
            name: "Marathon Scroller",
            description: "Scrolled 10,000 pixels.",
            xp: 40,
            hidden: false
        },

        {
            id: "visitor",
            name: "Loyal Visitor",
            description: "Stayed on the site for 1 minute.",
            xp: 50,
            hidden: false
        },

        {
            id: "afk",
            name: "AFK Champion",
            description: "Stayed idle for 5 minutes.",
            xp: 100,
            hidden: true
        },

        {
            id: "mouse",
            name: "Mouse Traveler",
            description: "Moved your mouse 100,000 pixels.",
            xp: 75,
            hidden: false
        }

    ],

    buildList() {

        const ul = document.getElementById("achievement-list");

        ul.innerHTML = "";

        this.list.forEach(a => {

            const li = document.createElement("li");

            li.id = "achievement-" + a.id;

            li.className = "locked";

            if (a.hidden) {

                li.innerHTML = "❓ Secret Achievement";

            } else {

                li.innerHTML = "🏆 " + a.name;

            }

            ul.appendChild(li);

        });

    },

    unlock(id) {

        if (Game.unlocked.has(id))
            return;

        const achievement = this.list.find(a => a.id === id);

        if (!achievement)
            return;

        Game.unlocked.add(id);

        const item = document.getElementById("achievement-" + id);

        if (item) {

            item.classList.remove("locked");
            item.classList.add("unlocked");

            item.innerHTML = "🏆 " + achievement.name;

        }

        Popup.show(
            achievement.name,
            achievement.description
        );

        XP.add(achievement.xp);

        Storage.save();

    }

};
