// =====================================
// XP System
// =====================================

const XP = {

    add(amount) {

        Game.stats.xp += amount;

        while (Game.stats.xp >= this.requiredXP()) {

            Game.stats.xp -= this.requiredXP();

            Game.stats.level++;

            Popup.show(
                "Level Up!",
                `You reached Level ${Game.stats.level}!`
            );

        }

        this.updateUI();

        Storage.save();

    },

    requiredXP() {

        return Game.stats.level * 100;

    },

    updateUI() {

        document.getElementById("level").textContent =
            Game.stats.level;

        document.getElementById("xp").textContent =
            Game.stats.xp;

        document.getElementById("next-level").textContent =
            this.requiredXP();

        const percent =
            (Game.stats.xp / this.requiredXP()) * 100;

        document.getElementById("xp-fill").style.width =
            percent + "%";

    }

};
