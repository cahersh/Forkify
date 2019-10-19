// Purpose: Holds all DOM elements
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResultList: document.querySelector('.results__list')
};

// Purpose: Holds class information
export const elementStrings = {
    loader: 'loader'
};

// Purpose: renders the loading icon
// Input: parent element where to render loading icon
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    // Inserts loader into DOM tree
    parent.insertAdjacentHTML('afterbegin', loader);
};

// Purpose: clears the loading icon
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    // If there is a loader, delete it
    if (loader) loader.parentElement.removeChild(loader);
};