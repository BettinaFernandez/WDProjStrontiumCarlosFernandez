const suggestionForm = document.getElementById('suggestionForm');
const suggestionWall = document.getElementById('suggestionWall');
const editIndexField = document.getElementById('editIndex');
const submitBtn = document.getElementById('submitBtn');

let suggestions = JSON.parse(localStorage.getItem('mySuggestions')) || [];

// 1. READ: Display items on load
function displaySuggestions() {
    suggestionWall.innerHTML = '';
    suggestions.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${item.name} says:</h3>
            <p>${item.idea}</p>
            <div class="btn-group">
                <button class="edit-btn" onclick="editItem(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
            </div>
        `;
        suggestionWall.appendChild(card);
    });
}

// 2. CREATE & UPDATE
suggestionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const idea = document.getElementById('userIdea').value;
    const index = editIndexField.value;

    if (index === "") {
        // Create Mode
        suggestions.push({ name, idea });
    } else {
        // Update Mode
        suggestions[index] = { name, idea };
        editIndexField.value = "";
        submitBtn.innerText = "Suggest Recipe ✨";
    }

    localStorage.setItem('mySuggestions', JSON.stringify(suggestions));
    suggestionForm.reset();
    displaySuggestions();
});

// 3. DELETE
function deleteItem(index) {
    if (confirm("Remove this recipe? 🌸")) {
        suggestions.splice(index, 1);
        localStorage.setItem('mySuggestions', JSON.stringify(suggestions));
        displaySuggestions();
    }
}

// 4. PRE-FILL FOR UPDATE
function editItem(index) {
    const item = suggestions[index];
    document.getElementById('userName').value = item.name;
    document.getElementById('userIdea').value = item.idea;
    editIndexField.value = index;
    submitBtn.innerText = "Update Recipe 🎀";
    window.scrollTo(0, 0); // Scroll to form
}

displaySuggestions();