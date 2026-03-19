// Add all your recipe data here!
const recipeData = [
    {
        title: "Rice and Vegetables",
        desc: "",
        link: "../rice_veggies_recipes/rice_veggies.html"
    },
    {
        title: "Beef Recipes",
        desc: "Hearty and savory dishes for the meat lover. From classic stews to sizzling steaks, explore the rich flavors of beef!",
        link: "../beef_recipes/beef.html",
    },
    {
        title: "Pork Recipes",
        desc: "Versatile and delicious. Discover sweet and savory pork recipes that are 'Even Better Than Mama's!'",
        link: "../pork_recipes/pork.html",
    },
    {
        title: "Desserts",
        desc: "Sweet, mouthwatering treats to end your meal. From cakes to puddings, Phoebe's sweet tooth has you covered!",
        link: "../desserts_recipes/desserts.html",
    },
    {
        title: "Chicken Recipes",
        desc: "",
        link: "../chicken_recipes/chicken.html"
    },
    {
       title: "Beverages",
       desc: "",
       link:  "../drink_recipes/drinks.html"
    },
    {
        title: "Pasta Recipes",
        desc: "",
        link: "../pasta_recipes/pasta_noodles.html"
    }

];

let currentIndex = 0;

function changePage(direction) {
    currentIndex += direction;

    // Boundary checks (Looping)
    if (currentIndex >= recipeData.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = recipeData.length - 1;

    const data = recipeData[currentIndex];

    // Update the DOM
    document.getElementById('left-title').innerText = data.title;
    document.getElementById('recipe-desc').innerText = data.desc;
    
    const linkBtn = document.getElementById('recipe-link');
    linkBtn.href = data.link;
    linkBtn.innerHTML = `Open ${data.title} Ledger`;
    
    document.getElementById('page-num').innerText = `Page ${currentIndex + 1}`;
}