import axios from 'axios';

async function getResults(query) {
    const key = 'aaaaaaaaaaaaaaaaa34c9f2aabd9c06a05e603615806facde';
    try {
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = res.data.recipes
        console.log(res);
    } catch(error) {
        alert(error);
    }
    
}
getResults('pizza');