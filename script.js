// ================================
// Gamified Nonsense
// Part 2 - Achievement Engine
// ================================

// ---------- Player Stats ----------

let stats = {
    xp: 0,
    level: 1,
    clicks: 0,
    keys: 0,
    scroll: 0,
    playTime: 0
};

const unlocked = new Set();

// ---------- Elements ----------

const xpText = document.getElementById("xp");
const nextLevel = document.getElementById("next-level");
const levelText = document.getElementById("level");
const xpFill = document.getElementById("xp-fill");

const clicksText = document.getElementById("clicks");
const keysText = document.getElementById("keys");
const scrollText = document.getElementById("scroll");
const timeText = document.getElementById("time");

const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toast-title");
const toastDescription = document.getElementById("toast-description");

// ---------- XP ----------

function addXP(amount){

    stats.xp += amount;

    let needed = stats.level * 100;

    while(stats.xp >= needed){

        stats.xp -= needed;
        stats.level++;

        unlockAchievement(
            "Level Up!",
            `Reached Level ${stats.level}`
        );

        needed = stats.level * 100;
    }

    updateUI();
}

// ---------- Achievement ----------

function unlockAchievement(title, description){

    if(unlocked.has(title))
        return;

    unlocked.add(title);

    toastTitle.textContent = title;
    toastDescription.textContent = description;

    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },4500);

    addXP(25);

    const list = document.querySelectorAll("#achievement-list li");

    list.forEach(item=>{

        if(item.textContent.includes(title)){

            item.classList.remove("locked");
            item.classList.add("unlocked");

        }

    });

}

// ---------- Update UI ----------

function updateUI(){

    clicksText.textContent = stats.clicks;
    keysText.textContent = stats.keys;
    scrollText.textContent = stats.scroll.toLocaleString()+" px";

    let minutes = Math.floor(stats.playTime/60);
    let seconds = stats.playTime%60;

    timeText.textContent =
        `${minutes}m ${seconds}s`;

    xpText.textContent = stats.xp;
    levelText.textContent = stats.level;

    let needed = stats.level*100;

    nextLevel.textContent = needed;

    xpFill.style.width =
        (stats.xp/needed*100)+"%";

}

// ---------- Click Tracking ----------

document.addEventListener("click",()=>{

    stats.clicks++;

    updateUI();

    if(stats.clicks===25){

        unlockAchievement(
            "Click Addict",
            "Clicked 25 times."
        );

    }

});

// ---------- Keyboard ----------

document.addEventListener("keydown",()=>{

    stats.keys++;

    updateUI();

    if(stats.keys===100){

        unlockAchievement(
            "Keyboard Warrior",
            "Pressed 100 keys."
        );

    }

});

// ---------- Scroll ----------

let lastScroll = window.scrollY;

window.addEventListener("scroll",()=>{

    stats.scroll += Math.abs(window.scrollY-lastScroll);

    lastScroll = window.scrollY;

    updateUI();

    if(stats.scroll>=10000){

        unlockAchievement(
            "Marathon Scroller",
            "Scrolled over 10,000 pixels."
        );

    }

});

// ---------- Play Time ----------

setInterval(()=>{

    stats.playTime++;

    updateUI();

    if(stats.playTime===60){

        unlockAchievement(
            "Loyal Visitor",
            "Stayed for one minute."
        );

    }

},1000);

// ---------- Hover Achievement ----------

const dummy = document.getElementById("dummy-link");

let hoverTimer;

dummy.addEventListener("mouseenter",()=>{

    hoverTimer = setTimeout(()=>{

        unlockAchievement(
            "The Hesitator",
            "Hovered over a link for 45 seconds."
        );

    },45000);

});

dummy.addEventListener("mouseleave",()=>{

    clearTimeout(hoverTimer);

});

// ---------- Start ----------

updateUI();
