let dIndex = 0; //tracks the dialogue
const lines = ["Ready to cook?", "Let's make the Golden Omelette!", "That's all, good luck!"];

let step = 1; // currrent cooking stage
let val = 0; // progrerss bar
let active = false; //see if user is active

const gameImg = document.getElementById('gameImg');
const utensil = document.getElementById('utensil');
const bar = document.getElementById('bar');
const title = document.getElementById('stepTitle');

function startDialogue() {
    document.getElementById('recipeMenu').style.display = "none";
    document.getElementById('dialogueScreen').style.display = "flex";
    type(lines[0]);
}
// TYPEWRITER ANIMATIONNNNNNNNNNN YAAAAY
function type(t) {
    let i = 0;
    document.getElementById('typeText').innerHTML = "";
    let q = setInterval(() => {
        document.getElementById('typeText').innerHTML += t.charAt(i);
        i++;
        if(i >= t.length) clearInterval(q);
    }, 40);
}

function handleNext() {
    dIndex++;
    if(dIndex < lines.length) type(lines[dIndex]);
    else endDialogue();
}
//launch gameplay
function endDialogue() {
    document.getElementById('dialogueScreen').style.display = "none";
    document.getElementById('gameScreen').style.display = "flex";
}

document.onmousemove = (e) => {
    if(step === 2) {
        utensil.style.left = (e.clientX - 60) + "px";
        utensil.style.top = (e.clientY - 60) + "px";
        if(active) { val += 0.8; update(); }
    }
};
//mous emoving
function startAction() {
    active = true;
    if(step === 1 || step === 3) {
        val += 20;
        gameImg.classList.add('shake');
        update();
    }
    if(step === 2) gameImg.classList.add('shake');
}
//mouse not mving
function stopAction() {
    active = false;
    gameImg.classList.remove('shake');
}
//progress bar update
function update() {
    bar.style.width = val + "%";
    if(val >= 100) {
        val = 0;
        bar.style.width = "0%";
        stopAction();
        goNext();
    }
}

function goNext() {
    step++;
    if(step === 2) {
        title.innerText = "Step 2: Whisk the Eggs!";
        gameImg.src = "../../assets/bowl.png";
        utensil.style.display = "block";
    } else if(step === 3) {
        title.innerText = "Step 3: Frying Time!";
        gameImg.src = "../../assets/pan.png";
        utensil.style.display = "none";
    } else if(step === 4) {
        title.innerText = "Step 4: Add the Toppings!";
        document.getElementById('ingredientShelf').style.display = "block";
    } else {
        document.getElementById('gameScreen').style.display = "none";
        document.getElementById('endScreen').style.display = "flex";
    }
}

function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }
document.getElementById('targetArea').ondragover = (e) => e.preventDefault();
document.getElementById('targetArea').ondrop = (e) => {
    if(step === 4) {
        val += 50;
        update();
    }
};