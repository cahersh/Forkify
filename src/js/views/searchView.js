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
                    <h4 class="results__name">${recipe.title}</h4>
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