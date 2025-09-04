function NoRecipes() {
    let loading = "...";
    
    // setInterval(() => {
    //     console.log(loading)
    //     if (loading.length === 3){
    //         loading = ".";
    //     }
    //     else {
    //         loading += ".";
    //     }
    // }, 1000);

    return (
        <>
            <div>
                <h2 className="mb-6 text-3xl">No Recipes Found{loading}</h2>
                <a href="../Home">
                    <button>
                        Return to Home
                    </button>
                </a>
            </div>
        </>
    )
}

export default NoRecipes;