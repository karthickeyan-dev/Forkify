import { API_URL } from './config';
import { getJSON } from './helpers';

const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
    };
    // console.log(state.recipe);
    return state.recipe;
  } catch (err) {
    console.error(`🚫🚫🚫${err}🚫🚫🚫`);
  }
};
