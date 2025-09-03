import { useRef } from 'react';

function RecipeProfile(props) {
    
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
    }

    const ingredientsList = getIngredients();

    return (
        <>
            <div>
                {/* Menu Item Name*/}
                <div>
                    <div className="sub-header">
                        <img id="recipe-image" src={recipe.strMealThumb}/>
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
                    <p style={{justifyContent: "right"}}>
                        {recipe.strInstructions.split(".").map((item) => {
                            if (item.length > 1){
                                return (
                                    <span>{item.trim() + ". "}<br/></span>
                                )
                            }
                        })}
                    </p>
                </div>
                </div>
                

                {/* Source and Video */}
                <div>
                    <div>
                        <h3>
                            <strong>Recipe Source: </strong> 
                            <a href={recipe.strSource} target="_blank" rel="nostopper noopener">
                                Find Recipe
                            </a>
                        </h3>
                        <h3>
                            <strong>Recipe on YouTube: </strong>
                            <a href={recipe.strYoutube} target="_blank" rel="nostopper noopener">
                                YouTube Video
                            </a>
                        </h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecipeProfile;