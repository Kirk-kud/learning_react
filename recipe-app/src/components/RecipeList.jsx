import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import RecipeProfile from './RecipeProfile';

function RecipeList(props) {
    const [ selectedRecipe, setSelectedRecipe ] = useState(null);

   

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
    };
    
    return (
        <ul>
            {props.list.map(recipeItem => {
                return (
                    <li
                        key={recipeItem.strMeal} 
                        className={`p-3 rounded-md cursor-pointer transition-colors duration-200 
                        ${selectedRecipe === recipeItem ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                        onClick={() => handleOptionClick(recipe)}
                    >
                        {recipeItem.strMeal}
                        {console.log(recipeItem.strMeal)}
                        {console.log("Test 3")}
                    </li>
                )           
            })}
        </ul>
    );
}

export default RecipeList