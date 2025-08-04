// This is where your JS goes!

// You can fetch data from https://cs571api.cs.wisc.edu/rest/s25/ice/chili
// When you are complete, you should also be able to fetch data from...
//  https://cs571api.cs.wisc.edu/rest/s25/ice/pasta
//  https://cs571api.cs.wisc.edu/rest/s25/ice/pizza

let recipe;
let baseAmounts = [];
let reviewNum = 0;

function updateRecipe() {
    const recipeName = document.getElementById("recipe-selector").value;
    fetch("https://cs571.org/rest/s25/ice/" + recipeName, {
        headers: {
            "X-CS571-ID": CS571.getBadgerId()
        }
    })
    .then((d) => {
        console.log(d.status)
        return d.json()
    })
    .then((data) => {
        console.log(data); // for debugging!
        recipe = data; // make recipe available everywhere. this is a reference to the SAME object.

        document.getElementById("recipe-name").innerText = data.name;
        document.getElementById("recipe-author").innerText = data.author;
        document.getElementById("recipe-img").src = data.img.location;
        document.getElementById("recipe-img").alt = data.img.description;
    
        // set instructions
        let instructionsNode = document.getElementById("instructions");
        instructionsNode.innerHTML = ''; // clear out any existing instructions
        for (let step of data.recipe) {
            let newNode = document.createElement("li");
            newNode.innerText = step;
            instructionsNode.appendChild(newNode);
        }

        // set the table
        // Remember! ingredients is an object of objects, not a list
        const ingrsHTML = document.getElementById("ingredients-body");
        ingrsHTML.innerHTML = ''; // clear out any existing ingredients
        baseAmounts = [];         // as well as any existing base amounts
        let ingrNames = Object.keys(data.ingredients); //return the array of keys
        for(let ingrName of ingrNames) {
            let ingr = data.ingredients[ingrName];
    
            const ingrRowHTML = document.createElement("tr")
            const ingrAmountHTML = document.createElement("td");
            const ingrUnitHTML = document.createElement("td");
            const ingrNameHTML = document.createElement("td");
    
            baseAmounts.push(ingr.amount); // add the element(s) at the end of the array
    
            ingrAmountHTML.innerText = ingr.amount
            if (ingr.unit) {
                ingrUnitHTML.innerText = ingr.unit;
            }
            if (ingr.misc) {
                ingrNameHTML.innerText = ingrName + " (" + ingr.misc + ")";
            } else {
                ingrNameHTML.innerText = ingrName;
            }
    
            ingrRowHTML.appendChild(ingrAmountHTML);
            ingrRowHTML.appendChild(ingrUnitHTML);
            ingrRowHTML.appendChild(ingrNameHTML);
            ingrsHTML.appendChild(ingrRowHTML);
        }
    })
}

function updateYield() {
    if (recipe) {
        // the value read from this is always a string
        const numServings = parseInt(document.getElementById("serving-selector").value);
        const rows = document
            .getElementById("ingredients-body")
            .getElementsByTagName("tr");
        
        for (let i = 0; i < rows.length; i++) {
            rows[i].getElementsByTagName("td")[0].innerText = baseAmounts[i] * numServings;
        }
    } else {
        alert("Sorry, no data yet.")
    }
}

function displayReview() {
    if (recipe) {
        let reviews = recipe.reviews;
        alert(reviews[reviewNum].txt);
        reviewNum = (reviewNum + 1) % reviews.length;

    } else {
        alert("Sorry, no data yet.")
    }
}

// run updateRecipe on script load
// select the first option automatically
updateRecipe();
