import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import RecipeProfile from './RecipeProfile';

function RecipeList(props) {
    const selectedRecipe = useRef([]);

    const secondNode = document.getElementById('root');
    const secondRoot = createRoot(secondNode);

    const handleRecipeClick = (recipe) => {
        selectedRecipe.current = recipe;
        secondRoot.render(<RecipeProfile recipe={selectedRecipe}/>);
    };
    
    return (
        <ul>
            {props.list.map(recipeItem => {
                return (
                    <li
                        key={recipeItem.strMeal} 
                        className={`p-3 rounded-md cursor-pointer transition-colors duration-200 
                        ${selectedRecipe === recipeItem ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                        onClick={() => handleRecipeClick(recipeItem)}
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