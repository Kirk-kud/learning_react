import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import RecipeProfile from './RecipeProfile';

function RecipeList(props) {
    const selectedRecipe = useRef([]);
    const [ isRootInitialised, setIsRootInitialised ] = useState(false);

    

    const handleRecipeClick = (recipe) => {
        const secondNode = document.getElementById('root');
        let secondRoot;
        console.log(secondRoot);
        console.log(isRootInitialised);
        if (!isRootInitialised){
            secondRoot = createRoot(secondNode);
            setIsRootInitialised(true)
        }
        console.log(secondRoot);

        selectedRecipe.current = recipe;
        secondRoot.render(<RecipeProfile recipe={selectedRecipe} recipes={props.list}/>);
    };
    
    return (
        <>
            <a className="fixed flex items-center justify-center z-[1000] left-4 top-4" href={"../"} >
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M233.85-193.85h156.92v-238.46h178.46v238.46h156.92v-369.23L480-749.49 233.85-563.25v369.4ZM200-160v-420l280-211.54L760-580v420H535.38v-238.46H424.62V-160H200Zm280-311.74Z"/></svg><span className="text-black">Return<br />Home</span>
            </a>
            <h2>
                <strong>
                    Here are the options:
                </strong>
            </h2>
            <ul className="p-3">
            {props.list.map(recipeItem => {
                return (
                    <li
                        key={recipeItem.strMeal} 
                        className={`p-3 rounded-md cursor-pointer transition-colors duration-200 mb-3
                        ${selectedRecipe === recipeItem ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                        onClick={() => handleRecipeClick(recipeItem)}
                    >
                        {recipeItem.strMeal}
                    </li>
                )           
            })}
        </ul>
        </>
        
    );
}

export default RecipeList