import axios from 'axios';
import {key} from '../config';
import {Fraction} from 'fractional';

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
            alert('Something went wrong :(');
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

    // Purpose: parse the ingredients from the API call
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // 1. Uniform units
            let ingredient = el.toLowerCase();
            // Replaces units to shorter version
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2. Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3. Parse ingredients into count, unit, and ingredient
            const arrIng = ingredient.split(' '); // Split ingredients by space
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2)); // find index where UnitsShort is located

            let objIng;

            if(unitIndex > -1) {
                // There is a unit
                // ex. 4 1/2 cups, arrCount = [4, 1/2] --> eval('4+1/2') --> 4.5
                // ex. 4 cups, arrCount = [4]
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if (arrCount.length === 1) {
                    // only 1 number ex. 4
                    count = eval(arrIng[0].replace('-', '+'));
                }
                else {
                    // more than 1 number ex. 4 1/2
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
            }
            else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is a number
                // ex: 1 pre-made pizza crust
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };
            }
            else if (unitIndex === -1) {
                // There is NO unit and NO number in the first position
                // ex: Salt to taste
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }

    // Purpose: function to update the number of servings
    // Inputs: type - increase or decrease the number of servings
    updateServings (type) {
        // Servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        // Ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });

        this.servings = newServings;
    }
}