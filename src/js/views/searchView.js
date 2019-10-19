import {elements} from './base'; //Holds all DOM elements

// Purpose: gets DOM value from search field
export const getInput = () => elements.searchInput.value;

// Purpose: clear the search value
export const clearInput = () => {
    elements.searchInput.value = '';
};

// Purpose: clear the recipes list
export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
};

// Purpose: limit length of recipe title but don't split individual words
// Inputs: title - title of the recipe, limit - character limit for title
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    // Test if title is longer than limit
    if (title.length > limit) {
        //Split string by spaces into array - 'Pasta with tomato and spinach' => ['Pasta','with','tomato','and','spinach']
        title.split(' ').reduce((acc, cur) => {
            // Add values from array until limit is reached
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0); 

        // return new title and join newTitle with spaces
        return `${newTitle.join(' ')} ...`;
    }

    // else - return the title
    return title;
};

// Purpose: Renders a single recipe - adds single recipe to result list
// Input: a single recipe
const renderRecipe = recipe => {
    // markup: HTML markup with recipe info to be rendered
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    // Inserts markup into DOM tree inside the results list after the last child
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

// Purpose: renders all recipes by calling renderRecipe
// Inputs: all recipes
export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};