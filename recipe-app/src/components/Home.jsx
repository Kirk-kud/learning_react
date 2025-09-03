import { createRoot } from 'react-dom/client';
import RecipeList from './RecipeList';
import { useState, useEffect, useRef } from 'react';

function Home() {
    let [ recipes, setRecipes ] = useState([]);
    const darkMode = true; // Dummy value which will be replaced by a context value

    function handleSubmit() {
        const text = document.getElementById('recipe-name').value;

        // document.getElementById('welcome-display').style.display = 'none';
        const node = document.getElementById('recipe-display');
        const root = createRoot(node);

        // Getting the recipes from the API
        
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`).then(
            response => response.json()
        ).then(
            response => {
                recipes = response.meals;
                console.log(response.meals); 
            }
        ).catch(
            error => {
                console.error("An error occurred: " + error);
            }
        )

        console.log(recipes)
        root.render(<RecipeList list={recipes} />)
    }

    return (
        <>
         <div id="welcome-display">
            <a className="fixed flex items-center justify-center z-[1000] right-4 top-4" href="https://github.com/Kirk-kud/learning_react/tree/master/recipe-app" target="_blank" rel="nostopper noopener" >
            <img className="w-8 h-8" src={darkMode ? "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-white-icon.png" : "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"}/> 
            </a>
            <h1 className="text-5xl m-8">
                Welcome to the Recipe Search App
            </h1>
            <h3 className="text-xl m-8">
                Search for any recipe below:
            </h3>
            <div>
                <div>

                </div>
                <input id="recipe-name" className="w-72 h-10 rounded-full border border-black-300 p-2" type="text" />
                <button className="search-button" onClick={handleSubmit}>
                    Search
                </button>
            </div>
         </div>
         <div id="root"></div>
         <div id="recipe-display"></div>
        </>
    );
}

export default Home;