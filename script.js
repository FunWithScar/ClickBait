// Temporary demo values

document.getElementById("clicks").textContent = 0;
document.getElementById("keys").textContent = 0;
document.getElementById("scroll").textContent = "0 px";
document.getElementById("time").textContent = "0s";

// Demo popup

setTimeout(() => {

    const toast = document.getElementById("toast");

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    },5000);

},1500);
