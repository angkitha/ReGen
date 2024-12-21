import { useState } from "react";
import { Recipe, RecipeURL, DataRecipe } from './interfaces'; /* Contains interfaces for this page. */

export const functsWelcomePage = () => {

    /* Function Arrays */
    const [ingredient, setIngredient] = useState("");
    const [ingredientsList, setIngredientsList] = useState<string[]>([]); 
    const[recipeID, setRecipesID] = useState<any[]>([]);
    const[loading, setLoading] = useState(false); 
    const [error, setError] = useState<string | null>(null); 

    /* Allows page to respond to ingredient input */
    const handleIngredientChange = (IngredientEvent: React.ChangeEvent<HTMLInputElement>) => {
        setIngredient(IngredientEvent.target.value);
    };

    /* Adds ingredient to list on page, prevents duplicates */
    const addIngredient = () => {
        if (ingredient.trim()) {
        if (ingredientsList.includes(ingredient.trim())) {
            alert("You've already added this item.");
        } 
        else {
            setIngredientsList([...ingredientsList, ingredient.trim()]);
        }
        setIngredient("");
        }
    };

    /* API Query. Done in backend using APIBackend.py */
    const APIRecipe = async (): Promise<{ recipeTitles: string[]; recipeURLs: string[] }> => {
    
        if(ingredientsList.length === 0) {
            setError("Please add one or more ingredients."); 
            return { recipeTitles: [], recipeURLs: [] };
        }

        else{
            setLoading(true); 
            setError(null); 
            const recipeTitles: string[] = [];
            const recipeURLs: string[] = [];

            try {
                const response = await fetch('http://127.0.0.1:5000/get_recipes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ingredientsList }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'An error occurred while fetching recipes.');
                }

                const data = await response.json();
                recipeTitles.push(data.recipes.map( (recipeName: any) => recipeName.title));
                recipeURLs.push(data.recipes.map((recipeURL: any) => recipeURL.url));
            }
            
            catch (APIError: any) {
                setError(APIError.message);
            } 
            finally {
                setLoading(false);
            }
            return { recipeTitles, recipeURLs };
        }
        
    }; 
    
    /* Ingredient Remove Function */
    const handleRemoveName = (index: number) => {
        setIngredientsList(ingredientsList.filter((_, i) => i !== index));
    };

    return {
        ingredient,
        ingredientsList,
        recipeID,
        loading,
        error,
        setIngredient,
        setIngredientsList,
        setRecipesID,
        setLoading,
        setError,
        handleIngredientChange,
        addIngredient,
        APIRecipe,
        handleRemoveName,
      };

}