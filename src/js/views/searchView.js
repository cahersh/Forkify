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
    elements.searchResPages.innerHTML = '';
};

// Purpose: Highlight the selected recipe
// Inputs: id - the id of the recipe
export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    
    // Remove active for each recipe in list
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });

    // Adds active class to selected recipe from list
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
};

// Purpose: limit length of recipe title but don't split individual words
// Inputs: title - title of the recipe, limit - character limit for title
export const limitRecipeTitle = (title, limit = 17) => {
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

// Purpose: creates HTML for button
// Inputs: page - page number we are on, type - 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>    
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left': 'right'}"></use>
        </svg>
    </button>
`;

// Purpose: render page buttons. Page 1, show button for page 2. Page X, show buttons for page X-1 and page X+1. Page last, show button for previous
// Inputs: page - page to display recipes, numResults - total number of results(recipes), RecPerPage - results(recipes) per page
const renderButtons = (page, numResults, ResPerPage) => {
    // Total number of pages - round up if decimal
    const pages = Math.ceil(numResults / ResPerPage);

    // element to place on HTML
    let button;

    // On first page and there is more than 1 page
    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
    }
    // On page X
    else if (page < pages) {
        // Display button for next page and dispaly button for previous page
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    }
    // On last page and there is more than 1 page
    else if (page === pages && pages > 1) {
        // Only button to go to previous page
        button = createButton(page, 'prev');
    }

    // Insert buttons in HTML
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);

};

// Purpose: renders all recipes by calling renderRecipe
// Inputs: recipes - all recipes, page - page to display results (recipes), resPerPage - number of results (recipes) per page
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    //start location for slice. ex page = 2, start = 10
    const start = (page - 1) * resPerPage; 

    // end location for slice. ex page = 2, end = 20
    const end = page * resPerPage; 

    // render recPerPage for the given page
    recipes.slice(start,end).forEach(renderRecipe);

    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};