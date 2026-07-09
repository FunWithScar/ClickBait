// =====================================
// Gamified Nonsense v2.0
// script.js
// =====================================

// ---------- Player Data ----------

let game = {
    xp: 0,
    level: 1,

    clicks: 0,
    keys: 0,

    scroll: 0,
    mouseDistance: 0,

    playTime: 0,

    achievements: []
};

// ---------- Achievement Database ----------

const achievements = [

{
    id:"click25",
    name:"Click Addict",
    desc:"Clicked 25 times.",
    xp:25
},

{
    id:"keys100",
    name:"Keyboard Warrior",
    desc:"Pressed 100 keys.",
    xp:25
},

{
    id:"scroll10000",
    name:"Marathon Scroller",
    desc:"Scrolled 10,000 pixels.",
    xp:40
},

{
    id:"mouse100000",
    name:"Mouse Traveler",
    desc:"Moved your mouse 100,000 pixels.",
    xp:60
},

{
    id:"visitor60",
    name:"Loyal Visitor",
    desc:"Stayed for one minute.",
    xp:50
}

];

// ---------- Save / Load ----------

function saveGame(){

    localStorage.setItem(
        "gamified-save",
        JSON.stringify(game)
    );

}

function loadGame(){

    const save =
        localStorage.getItem("gamified-save");

    if(save){

        game = JSON.parse(save);

    }

}

// ---------- XP ----------

function addXP(amount){

    game.xp += amount;

    while(game.xp >= game.level*100){

        game.xp -= game.level*100;

        game.level++;

        popup(
            "⭐ Level Up!",
            "Reached Level "+game.level
        );

    }

    updateUI();

}

// ---------- Popup ----------

let popupBusy=false;

const popupQueue=[];

function popup(title,description){

    popupQueue.push({
        title,
        description
    });

    if(!popupBusy){

        nextPopup();

    }

}

function nextPopup(){

    if(popupQueue.length===0){

        popupBusy=false;

        return;

    }

    popupBusy=true;

    const toast=document.getElementById("toast");

    document.getElementById("toast-title").textContent=
        popupQueue[0].title;

    document.getElementById("toast-description").textContent=
        popupQueue[0].description;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

        popupQueue.shift();

        setTimeout(nextPopup,400);

    },3500);

}

// ---------- Unlock Achievement ----------

function unlock(id){

    if(game.achievements.includes(id))
        return;

    const achievement=
        achievements.find(a=>a.id===id);

    if(!achievement)
        return;

    game.achievements.push(id);

    addXP(achievement.xp);

    popup(
        achievement.name,
        achievement.desc
    );

    updateAchievements();

    saveGame();

}

// ---------- Achievement List ----------

function updateAchievements(){

    const list=
        document.getElementById("achievement-list");

    list.innerHTML="";

    achievements.forEach(a=>{

        const li=document.createElement("li");

        if(game.achievements.includes(a.id)){

            li.className="unlocked";

            li.textContent="🏆 "+a.name;

        }

        else{

            li.className="locked";

            li.textContent="🔒 "+a.name;

        }

        list.appendChild(li);

    });

}

// ---------- UI ----------

function updateUI(){

    document.getElementById("level").textContent=
        game.level;

    document.getElementById("xp").textContent=
        game.xp;

    document.getElementById("next-level").textContent=
        game.level*100;

    document.getElementById("clicks").textContent=
        game.clicks;

    document.getElementById("keys").textContent=
        game.keys;

    document.getElementById("scroll").textContent=
        Math.floor(game.scroll)+" px";

    document.getElementById("mouse-distance").textContent=
        Math.floor(game.mouseDistance)+" px";

    let mins=Math.floor(game.playTime/60);

    let secs=game.playTime%60;

    document.getElementById("time").textContent=
        mins+"m "+secs+"s";

    document.getElementById("xp-fill").style.width=
        (game.xp/(game.level*100))*100+"%";

}

// ---------- Click ----------

document.addEventListener("click",()=>{

    game.clicks++;

    if(game.clicks>=25)
        unlock("click25");

    updateUI();

});

// ---------- Keyboard ----------

document.addEventListener("keydown",()=>{

    game.keys++;

    if(game.keys>=100)
        unlock("keys100");

    updateUI();

});

// ---------- Scroll ----------

let lastScroll=window.scrollY;

window.addEventListener("scroll",()=>{

    game.scroll+=Math.abs(
        window.scrollY-lastScroll
    );

    lastScroll=window.scrollY;

    if(game.scroll>=10000)
        unlock("scroll10000");

    updateUI();

});

// ---------- Mouse Distance ----------

let lastX=null;
let lastY=null;

document.addEventListener("mousemove",(e)=>{

    if(lastX===null){

        lastX=e.clientX;
        lastY=e.clientY;

        return;

    }

    let dx=e.clientX-lastX;

    let dy=e.clientY-lastY;

    game.mouseDistance+=
        Math.sqrt(dx*dx+dy*dy);

    lastX=e.clientX;
    lastY=e.clientY;

    if(game.mouseDistance>=100000)
        unlock("mouse100000");

    updateUI();

});

// ---------- Timer ----------

setInterval(()=>{

    game.playTime++;

    if(game.playTime>=60)
        unlock("visitor60");

    updateUI();

    saveGame();

},1000);

// ---------- Start ----------

loadGame();

updateAchievements();

updateUI();
