import { createRoot } from 'react-dom/client';
import RecipeList from './RecipeList';
import NoRecipes from './utils/NoRecipes';
import { useState, useEffect, useRef } from 'react';

function Home() {
    let [ recipes, setRecipes ] = useState([]);
    const darkMode = false; // Dummy value which will be replaced by a context value

    function handleEnterKey (e) {
        if (e.key == 'Enter' || e.keyCode === 13){
            e.preventDefault();
            document.getElementById('submit-button').click();
        }
    };

    async function handleSubmit() {
        recipes = [];
        const text = document.getElementById('recipe-name').value;

        if (text.trim().length == 0){
            console.error("No input entered");
            return;
        }

        document.getElementById('welcome-display').style.display = 'none';
        const node = document.getElementById('recipe-display');
        const root = createRoot(node);

        // Getting the recipes from the API
        
        await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`).then(
            response => response.json()
        ).then(
            response => {
                if (response.meals){
                    recipes =  response.meals;
                }
                console.log(response.meals); 
            }
        ).catch(
            error => {
                console.error("An error occurred: " + error);
            }
        )

        console.log(recipes)
        if (recipes.length > 0){
            root.render(<RecipeList list={recipes} />);
        }
        else {
            root.render(<NoRecipes />);
        }
    }

    // 

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
                <input id="recipe-name" className="w-72 h-10 rounded-full border border-black-300 p-2" type="text" onKeyDown={handleEnterKey}/>
                <button id="submit-button" className="search-button" onClick={handleSubmit}>
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