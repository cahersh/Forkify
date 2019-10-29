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

        // Perist data in localStorage
        this.persistData();

        return like;
    };

    // Purpose: delete recipe from like list
    // Inputs: id - recipe id
    deleteLike(id) {
        // find index of like where id === id to delete
        const index = this.likes.findIndex(el => el.id === id);
        // remove that recipe from likes
        this.likes.splice(index, 1);

        // Perist data in localStorage
        this.persistData()
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

    // Purpose: call setItem for localStorage to keep liked recipes on page refresh
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    // Purpose: gets the saved likes from localStorage
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        
        // Restorings likes from localStorage
        if (storage) this.likes = storage;
    }
}