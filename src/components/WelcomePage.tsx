import React, { useState } from "react";
import { Recipe, RecipeURL } from './interfaces'; /* Contains interfaces for this page. */
import { functsWelcomePage } from "./WelcomePageFunctions";
import "./WelcomeStyle.css"; /* File that contains CSS styling for this page. */
import axios from "axios";

/*Main Function*/

const WelcomePage: React.FC = () => {
  const {
    ingredient,
    ingredientsList,
    loading,
    error,
    handleIngredientChange,
    addIngredient,
    APIRecipe,
    handleRemoveName,
  } = functsWelcomePage();

  const [recipeTitles, setRecipeTitles] = useState<string[]>([]);
  const [recipeURLs, setRecipeURLs] = useState<string[]>([]);

  const getRecipeInfo = async (): Promise<{ recipeTitles: string[]; recipeURLs: string[] }> => {
    const { recipeTitles, recipeURLs } = await APIRecipe();
    setRecipeURLs(recipeURLs.flat()); 
    setRecipeTitles(recipeTitles.flat()); 
    return { recipeTitles, recipeURLs }; 
  };


  return (
    <div className = "particles-container">

      <div className = "left-section">


        <div className = "heading-left-container">
          <h1 className= "floating-text"> Welcome to ReGen!</h1>
            <p className= "description-text"> 
            ReGen is designed to help people who have trouble making
            <br />a meal out of the items in their fridge/pantry. Using the
            <br /> box below, please input the ingredients you wish to make use
            <br /> of and press enter to generate recipes you can cook. 
            </p>
        </div>
        
        <div className = "input-container">
          <input
            type="text"
            value={ingredient}
            onChange={handleIngredientChange}
            className = "input-box"
            placeholder="Input an ingredient..."
          />
          <h1> </h1>
          <button onClick={addIngredient} className="add-button">
            Add
          </button>
        </div>


      </div> 


      <div className = "right-section">


        <div className = "right-list">
          <h2 className = "right-list-heading">
            Your Ingredients:
          </h2>
            <div className = "right-list-body">
              <ul className="ingredients-list">
                {ingredientsList.map((item, index) => (
                  <li key={index} className="ingredient-text">
                    {`${index + 1}. ${item}`}
                    <button onClick = {() => handleRemoveName(index)} className="remove-button">
                      x
                    </button>
                  </li>
                ))}
              </ul>
              <button onClick={getRecipeInfo} className="recipe-add-button">
                Find Recipes
              </button>
            </div>
        </div>


      </div>
      

      <div className= "bottom-section">
        
        
        <div className = 'recipe-results'>
          <h2 className = 'recipe-results-heading'> 
            Recipes:
          </h2>
          {recipeTitles.length > 0 ? (
            <ul>
            {recipeTitles.map((title, index) => (
              <li key={index}>
                <a href={recipeURLs[index]} target="_blank" rel="noopener noreferrer">
                  {title}
                </a>
              </li>
            ))}
            </ul>
          ) :   
          (
            <p>No recipes to display. Add ingredients and fetch recipes.</p>
          )}


          </div>
        </div>
    </div>

  );
}; 


/* Right Section: Ingredients List
<ul className="ingredients-list">
                {ingredientsList.map((item, index) => (
                  <li key={index} className="ingredient-item">
                    {item}
                  </li>
                ))}
              </ul> http://127.0.0.1:5173/
              
              {Array.isArray(recipeURLs) ? (
                <p>Yes</p>
              ): (<p> no</p>)}
              */





export default WelcomePage;
