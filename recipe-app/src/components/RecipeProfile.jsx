import { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client'
import RecipeList from './RecipeList';

function RecipeProfile(props) {
    const [ isRootInitialised, setIsRootInitialised ] = useState(false);
    const recipe = props.recipe.current;

    function getIngredients() {
        let ingredients = [];
        let count = 1;

        while (true){
            const ingredient = recipe[`strIngredient${count}`];
            const measure = recipe[`strMeasure${count}`];

            if (!ingredient || !measure){
                console.log(ingredients);
                return ingredients;
            }
            else {
                ingredients.push({
                    ingredient: ingredient,
                    measure: measure 
                })
            }

            count++;
        }
    };

    function returnToRecipeList() {
        const returnNode = document.getElementById('root');
        let returnRoot;

        if (!isRootInitialised){
            returnRoot = createRoot(returnNode);
            setIsRootInitialised(true);
        }
        returnRoot.render(<RecipeList list={props.recipes}/>);
    };

    const ingredientsList = getIngredients();

    return (
        <>
            <div>
                <a className="fixed flex items-center justify-center z-[1000] left-4 top-4" href={"../"} >
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M233.85-193.85h156.92v-238.46h178.46v238.46h156.92v-369.23L480-749.49 233.85-563.25v369.4ZM200-160v-420l280-211.54L760-580v420H535.38v-238.46H424.62V-160H200Zm280-311.74Z"/></svg><span className="text-black">Return<br />Home</span>
                </a>
                <a className="fixed flex items-center justify-center z-[1000] left-4 top-20" onClick={returnToRecipeList}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M315.44-301.38q11.18 0 18.64-7.52 7.46-7.52 7.46-18.69 0-11.18-7.52-18.64-7.51-7.46-18.69-7.46-11.18 0-18.64 7.51-7.46 7.52-7.46 18.7 0 11.17 7.52 18.63 7.51 7.47 18.69 7.47Zm0-152.47q11.18 0 18.64-7.51 7.46-7.52 7.46-18.69 0-11.18-7.52-18.64-7.51-7.46-18.69-7.46-11.18 0-18.64 7.51-7.46 7.52-7.46 18.69 0 11.18 7.52 18.64 7.51 7.46 18.69 7.46Zm0-152.46q11.18 0 18.64-7.51 7.46-7.52 7.46-18.7 0-11.17-7.52-18.63-7.51-7.47-18.69-7.47-11.18 0-18.64 7.52-7.46 7.52-7.46 18.69 0 11.18 7.52 18.64 7.51 7.46 18.69 7.46Zm128.87 294.16h217.07v-30.77H444.31v30.77Zm0-152.47h217.07v-30.76H444.31v30.76Zm0-152.46h217.07v-30.77H444.31v30.77ZM215.38-160q-23.05 0-39.22-16.16Q160-192.33 160-215.38v-529.24q0-23.05 16.16-39.22Q192.33-800 215.38-800h529.24q23.05 0 39.22 16.16Q800-767.67 800-744.62v529.24q0 23.05-16.16 39.22Q767.67-160 744.62-160H215.38Zm0-30.77h529.24q9.23 0 16.92-7.69 7.69-7.69 7.69-16.92v-529.24q0-9.23-7.69-16.92-7.69-7.69-16.92-7.69H215.38q-9.23 0-16.92 7.69-7.69 7.69-7.69 16.92v529.24q0 9.23 7.69 16.92 7.69 7.69 16.92 7.69Zm-24.61-578.46v578.46-578.46Z"/></svg><span className="text-black">Recipe<br />List</span>
                </a>
                {/* Menu Item Name*/}
                <div>
                    <div className="sub-header">
                        <img id="recipe-image" className="mb-8 mt-8" src={recipe.strMealThumb}/>
                    </div>                
                    <h1>
                        {recipe.strMeal}
                    </h1>
                    <div style={{display: "flex", justifyContent: "space-around", padding: "3rem"}}>
                        <h3>
                            <strong>Area of Origin:</strong> {recipe.strArea}
                        </h3>
                        <h3>
                            <strong>Category:</strong> {recipe.strCategory}
                        </h3>
                        <h3>
                            <strong>Meal:</strong> {recipe.strMeal}
                        </h3>
                    </div>
                </div>
                { /* Ingredients */}
                <div className="main-content">
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", justifyItems: "center"}}>
                    <table style={{border: "1px solid black"}}>
                        <thead style={{border: "1px solid black"}}>
                            <tr style={{border: "1px solid black"}}>
                                <td style={{border: "1px solid black"}}>
                                    <strong>Ingredient</strong>
                                </td>
                            
                                <td>
                                    <strong>Measure</strong>
                                </td>
                            </tr>
                        </thead>
                        <tbody style={{border: "1px solid black"}}>
                            {ingredientsList.map((item, index) => {
                                return (
                                    <tr key={index} style={{border: "1px solid black"}}>
                                    <td style={{border: "1px solid black"}}>
                                        {item.ingredient}
                                    </td>
                                    <td>
                                        {item.measure}
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {/* Instructions */}
                <div className="instruction-content">
                    <h2>
                        <strong>Instructions</strong>        
                    </h2>
                    <ul style={{justifyContent: "right", listStyleType: "disc"}}>
                        {recipe.strInstructions.split(".").map((item, index) => {
                            if (item.length > 5){
                                return (
                                    <li key={index} className="mb-1">{item.trim() + ". "}<br/></li>
                                )
                            }
                        })}
                    </ul>
                </div>
                </div>
                

                {/* Source and Video */}
                <div id="recipe-resources">
                    <h3 className="p-3 mt-10">
                        <strong>Recipe Source: </strong> 
                        <a href={recipe.strSource} target="_blank" rel="nostopper noopener">
                            <span className="text-blue-500">
                                Original Recipe
                            </span>
                        </a>
                    </h3>
                    <h3 className="p-3 mt-10">
                        <strong>Recipe on YouTube: </strong>
                        <a href={recipe.strYoutube} target="_blank" rel="nostopper noopener">
                            <span className="text-blue-500">
                                Youtube Video
                            </span>
                        </a>
                    </h3>
                </div>
            </div>
        </>
    )
}

export default RecipeProfile;