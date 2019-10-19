import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';

// Global state of the app
//  - Search object
//  - Current recipe object
//  - Shopping list object
//  - Liked recipes
const state = {};

// Purpose: controller for search - interacts with Search model and searchView view
const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();

    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        // Clears search input on searchView view
        searchView.clearInput();

        // Clears recipe list
        searchView.clearResults();

        // Render loader in recipe list
        renderLoader(elements.searchRes);

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render results on UI
        // Clear loader
        clearLoader();
        
        // Passes search result to be rendered in searchView
        searchView.renderResults(state.search.result);
    }
}

// Purpose: Event listener for the Search submit button
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})


