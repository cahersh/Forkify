import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from './views/base';

// Global state of the app
//  - Search object
//  - Current recipe object
//  - Shopping list object
//  - Liked recipes
const state = {};

// Purpose: Search controller - interacts with Search model and searchView view
const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();

    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        // Clears search input on searchView view
        searchView.clearInput();

        // Clear recipe list
        searchView.clearResults();

        // Render loader in recipe list
        renderLoader(elements.searchRes);

        try {
            // 4. Search for recipes
            await state.search.getResults();
			
            // 5. Render results on UI
            // Clear loader
            clearLoader();

            // Passes search result to be rendered in searchView
            searchView.renderResults(state.search.result);
        } catch(err) {
            alert('Something went wrong with the search...');
            clearLoader();
        }
    }
}

// Purpose: Event listener for the Search submit button
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// Purpose: Event listener for page button clicks
elements.searchResPages.addEventListener('click', e => {
    // find closets element (.btn-inline) for span and svg
    const btn = e.target.closest('.btn-inline');
	
    if (btn) {
        // Holds integer of page to go to
        const goToPage = parseInt(btn.dataset.goto, 10);

        // Clear recipe list
        searchView.clearResults();

        // Call renderResults with the page to render
        searchView.renderResults(state.search.result, goToPage);
    }
});

// Purpose: Recipe controller - interacts with Recipe model and recipeView view
const controlRecipe = async () => {
    // 1. Get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // 2. Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight slected search item
        if (state.search) searchView.highlightSelected(id);

        // 3. Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // 4. Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // 5. Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // 6. Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (err) {
            alert('Error processing recipe!');
        }
    }
};

// Purpose: Event Listener for window load and hashchange that calls controlRecipe
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Purpose: Event Listener to handle recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }
    else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    console.log(state.recipe);
});