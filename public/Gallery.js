
let usersData = JSON.parse(localStorage.getItem("bakerUsers")) || {};
let currentUser = ""; //gets the username

//the dom thinyy
const authOverlay = document.getElementById('authOverlay');
const mainGallery = document.getElementById('mainGallery');
const bulletinBoard = document.getElementById('bulletinBoard');
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const imgCaption = document.getElementById('imgCaption');

function toggleAuth(isSignup) {
    document.getElementById('loginFields').style.display = isSignup ? 'none' : 'block';
    document.getElementById('signupFields').style.display = isSignup ? 'block' : 'none';
}
//verifies if the signup has been done or not
function handleAuth(isSignup = false) {
    const userInp = isSignup ? document.getElementById('newUsername').value : document.getElementById('username').value;
    
    if (!userInp) return alert("Please enter a username!");

    if (isSignup) {
        if (usersData[userInp]) return alert("Profile already exists! Try logging in.");
        // CREATE: Add new user to  data object
        usersData[userInp] = []; 
        saveToLocal();
    } else {
        if (!usersData[userInp]) return alert("User not found! Create a profile first.");
    }

    currentUser = userInp;
    showGallery();
}
//opens the gallery from the form to the main thing
function showGallery() {
    authOverlay.style.display = "none";
    mainGallery.style.display = "block";
    document.getElementById('userGreeting').innerText = `${currentUser}'s Baker Board`;
    loadPhotos();
}
dropZone.onclick = () => fileInput.click();

dropZone.ondragover = (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
};

dropZone.ondragleave = () => dropZone.classList.remove('drag-over');
//THIS IS THE DROP EVENT LOL
dropZone.ondrop = (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    processFile(file);
};

fileInput.onchange = (e) => processFile(e.target.files[0]);
//the image beocmes a localstroage string
function processFile(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageData = event.target.result; // This is the image as a string
            addPhoto(imageData);
        };
        reader.readAsDataURL(file);
    }
}


// CREATE
//pushes to user database
function addPhoto(url) {
    const caption = imgCaption.value || "Freshly Baked!";
    const newPhoto = {
        id: Date.now(),
        url: url,
        caption: caption
    };

    usersData[currentUser].push(newPhoto);
    saveToLocal();
    renderPhoto(newPhoto);
    imgCaption.value = ""; 
}

// READ
//iterares the stores array op the suser
function loadPhotos() {
    bulletinBoard.innerHTML = "";
    // Access the specific array for the logged-in user
    usersData[currentUser].forEach(photo => renderPhoto(photo));
}

function renderPhoto(photo) {
    const div = document.createElement('div');
    div.className = 'polaroid';
    div.innerHTML = `
        <div class="pin"></div>
        <img src="${photo.url}" alt="Baking Memory">
        <p>${photo.caption}</p>
        <button onclick="deletePhoto(${photo.id})" style="color: red; border: none; background: none; cursor: pointer; font-size: 10px;">Remove</button>
    `;
    bulletinBoard.appendChild(div);
}

// DELETE
function deletePhoto(id) {
    // Filter out the photo with the matching ID
    usersData[currentUser] = usersData[currentUser].filter(p => p.id !== id);
    saveToLocal();
    loadPhotos();
}
function saveToLocal() {
    
    localStorage.setItem("bakerUsers", JSON.stringify(usersData));
}