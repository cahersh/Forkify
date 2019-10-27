import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import {elements, renderLoader, clearLoader} from './views/base';

// Global state of the app
//  - Search object
//  - Current recipe object
//  - Shopping list object
//  - Liked recipes
const state = {};
window.state = state; //TESTING

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

// Purpose: List controller - interacts with List model and listView view
const controlList = () => {
    // 1. Create a new list if there is no list yet
    if(!state.list) state.list = new List();

    // 2. Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        // Update state
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        // Update UI
        listView.renderItem(item);
    });
}

// Purpose: Event Listener to handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);
    }
    // Handle the count update button
    else if (e.target.matches('.shopping__count-value')) {
        // Get new value from input
        const val = parseFloat(e.target.value, 10);
        
        // Update the state
        state.list.updateCount(id, val);
    }
});

// Purpose: Like controller - interacts with Like model
const controlLike = () => {
    // 1. Create a new like if there is no like yet
    if (!state.likes) state.likes = new Likes();

    const currentID = state.recipe.id;

    // 2. Check if recipe is liked or not
    if(!state.likes.isLiked(currentID)) {
        // NOT liked
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        // Toggle the like button

        // Add like to UI list
        console.log(state.likes);
    }
    else {
        // Liked

        // Remove like to the state
        state.likes.deleteLike(currentID);

        // Toggle the like button

        // Remove like to UI list
        console.log(state.likes);
    }
};

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
    else if (e.target.matches('.recipe__btn--add,.recipe__btn--add *')) {
        // Add recipes to shopping list button is clicked
        controlList();
    }
    else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Recipe like button is pressed
        controlLike();
    }
});

window.l = new List();