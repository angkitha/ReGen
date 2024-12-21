export interface Recipe {
    id: number;
    title: string;
    image: string;
    missedIngredientCount: number;
    missedIngredients: Array<{
      aisle: string;
      amount: number;
      id: number;
      name: string;
      original: string;
    }>;
}
  
export interface RecipeURL { 
      id: number; 
      title: string; 
      sourceUrl: string; 
}

export interface DataRecipe {
  title: string; 
  url: string; 
  index: number; 
}