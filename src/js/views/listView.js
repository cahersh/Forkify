import {elements} from './base'; //Holds all DOM elements

// Purpose: render the shopping list item
// Input: item - the ingredient object to add to the shopping list
export const renderItem = item => {
    // Create markup to be inserted into the shopping list
    const markup = `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;

    // Insert item into the shopping list
    elements.shopping.insertAdjacentHTML('beforeend', markup);
};


// Purpose: delete the shopping list item
// Input: id - the id of the ingredient object
export const deleteItem = id => {
    // Find item to delete
    const item = document.querySelector(`[data-itemid="${id}"]`);

    // Remove item from the shopping list
    if (item) item.parentElement.removeChild(item);
};