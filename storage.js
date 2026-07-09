// =====================================
// Storage System
// =====================================

const Storage = {

    KEY: "gamified-nonsense-save",

    save() {

        const saveData = {

            stats: Game.stats,

            unlocked: [...Game.unlocked]

        };

        localStorage.setItem(
            this.KEY,
            JSON.stringify(saveData)
        );

    },

    load() {

        const save =
            localStorage.getItem(this.KEY);

        if (!save)
            return;

        try {

            const data = JSON.parse(save);

            if (data.stats) {

                Game.stats = data.stats;

            }

            if (data.unlocked) {

                Game.unlocked =
                    new Set(data.unlocked);

            }

        }

        catch (e) {

            console.error("Save file corrupted.", e);

        }

    },

    clear() {

        localStorage.removeItem(this.KEY);

        location.reload();

    }

};

// Auto Save Every 10 Seconds

setInterval(() => {

    Storage.save();

},10000);
