import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = []
    }

    // Purpose: add item to shopping list
    // Inputs: ingredient info: count - measurement, unit - type of measurement, ingredient - name of ingredient
    addItem(count, unit, ingredient) {
        // object to hold count, unit, ingredient
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        };
        this.items.push(item);
        return item;
    };

    // Purpose: delete item from shopping list
    // Inputs: id - ingredient id created from addItem
    deleteItem(id) {
        // find index of items where id === id to delete
        const index = this.items.findIndex(el => el.id === id);
        // remove that ingredient
        this.items.splice(index, 1);
    };

    // Purpose: update the count (measurement) on shopping list
    // Inputs: id - id of ingredient in list, newCount - the new count to display
    updateCount(id, newCount) {
        // find ingredient by id and update the count to the new count
        this.items.find(el => el.id === id).count = newCount;
    }
}