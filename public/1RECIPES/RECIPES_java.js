// Add all your recipe data here!
const recipeData = [
    {
        title: "Rice and Vegetables",
        desc: "Bibimbap, cesarsalad, Egg Rice, Fried Rice, Onigiri, Risotto",
        link: "../rice_veggies_recipes/rice_veggies.html"
    },
    {
        title: "Beef Recipes",
        desc: "Beef Broccoli, Beef stew, Bulgogi, Gyudon, Wagyu Steak, Yakiniku",
        link: "../beef_recipes/beef.html",
    },
    {
        title: "Pork Recipes",
        desc: "Katsudon, Porchetta Pork Chops, Pork Adobo, Pork Menudo, Pork Steak",
        link: "../pork_recipes/pork.html",
    },
    {
        title: "Desserts",
        desc: "Brownies, Carrot Cake, Crepes, Rocky Road Ice Cream, Sansrival",
        link: "../desserts_recipes/desserts.html",
    },
    {
        title: "Chicken Recipes",
        desc: "Afritada, Katsu, Stroganoff, Tinola, Garlic Chicken Breast, Fried Chicken",
        link: "../chicken_recipes/chicken.html"
    },
    {
       title: "Beverages",
       desc: "Ginger Tea, Horchata, Hot Chocolate, Lemonade, Mango Shake, Vanilla Shake",
       link:  "../drinks_recipes/drinks.html"
    },
    {
        title: "Pasta Recipes",
        desc: "Carbonara, Garlic Butter Shrimp Scampi, Macaroni Salad, Pasta Pritata, Pasta Primavera, Spaghetti",
        link: "../pasta_recipes/pasta_noodles.html"
    }

];

let currentIndex = 0;

function changePage(direction) {
    currentIndex += direction;

    // Boundary checks 
    //loops through the htings thingys
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