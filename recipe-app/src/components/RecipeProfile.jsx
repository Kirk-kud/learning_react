

function RecipeProfile(props) {

    function getIngredients() {
        let ingredients = [];
        let count = 1;

        while (True){
            const ingredient = props[`strIngredient${count}`];
            const measure = props[`strMeasure${count}`];

            if (!ingredient || !measure){
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
        <div>
            {/* Menu Item Name*/}
            <div>
                <h1>
                    {props.strMeal}
                </h1>
                <div>
                    <h3>
                        Area of Origin: {props.strArea}
                    </h3>
                    <h3>
                        Category: {props.strCategory}
                    </h3>
                    <h3>
                        Meal: {props.strMeal}
                    </h3>
                </div>
            </div>
            { /* Ingredients */}
            <div>
                <table>
                    <tr>
                        <th>
                            Ingredient
                        </th>
                        <th>
                            Measure
                        </th>
                    </tr>
                    <tbody>
                        {ingredientsList.map((item, index) => {
                            <tr key={index}>
                                <td>
                                    {item.ingredient}
                                </td>
                                <td>
                                    {item.measure}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            {/* Instructions */}
            <div>
                <h1>
                    Instructions
                </h1>
                <p>
                    {props.strInstructions}
                </p>
            </div>

            {/* Source and Video */}
            <div>
                <div>
                    <h3>
                        Recipe Source: 
                        <a href={props.strSource}>
                            Find Recipe
                        </a>
                    </h3>
                    <h3>
                        Recipe on YouTube:
                        <a href={props.strYoutube}>
                            YouTube Video
                        </a>
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default RecipeProfile;