import axios from 'axios';
import {key} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    // Purpose: API call to Food2Fork based on recipe id
    async getRecipe() {
        try {
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            console.log(res);
        } catch(error) {
            console.log(error);
            alert('Something went from :(');
        }   
    }

    // Purpose: calculate the time for recipe (estimating 15mins per 3 ingredients)
    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    // Purpose: calculate the servings for recipe (estimating 4)
    calcServings() {
        this.servings = 4;
    }
}