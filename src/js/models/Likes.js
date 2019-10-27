export default class Likes {
    constructor() {
        this.likes = [];
    };

    // Purpose: like the selected recipe
    // Inputs: id - recipe id, title - title of recipe, author - author of recipe, img - img of recipe
    // Outputs: like - the like object that contains the inputs
    addLike(id, title, author, img) {
        const like = {id, title, author, img};
        this.likes.push(like);
        return like;
    };

    // Purpose: delete recipe from like list
    // Inputs: id - recipe id
    deleteLike(id) {
        // find index of like where id === id to delete
        const index = this.likes.findIndex(el => el.id === id);
        // remove that recipe from likes
        this.likes.splice(index, 1);
    };

    // Purpose: determine if the recipe is liked
    // Input: id - recipe id
    // Output: true/false if recipe is liked
    isLiked(id) {
        // Checks if recipe is liked
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    // Purpose: gets the number of liked recipes
    // Output: the number of liked recipes
    getNumLikes() {
        return this.likes.length;
    }
}