import { API_URL, RES_PER_PAGE, KEY } from './config';
import { getJSON, sendJSON } from './helpers';

const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    currentPage: 1,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceURL: recipe.source_url,
    image: recipe.image_url,
    cookingTime: recipe.cooking_time,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const getStateProperty = function (property) {
  return state[property];
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    state.recipe = createRecipeObject(data);

    state.recipe.isBookmarked = state.bookmarks.some(
      bookmark => bookmark.id === id
    );
    // console.log(state.recipe);
    return state.recipe;
  } catch (err) {
    throw err;
  }
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',');
        if (ingArr.length !== 3) {
          throw new Error(
            'Wrong ingredient format. Please enter the correct format'
          );
        }
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const formattedRecipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceURL,
      image_url: newRecipe.image,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    // console.log(recipe);

    const data = await sendJSON(`${API_URL}?key=${KEY}`, formattedRecipe);
    state.recipe = createRecipeObject(data);
    updateBookmarks(state.recipe);
    return state.recipe;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    state.search.currentPage = 1;
    const data = await getJSON(`${API_URL}?search=${query}`);
    const { recipes } = data.data;
    if (!recipes.length) throw new Error(`No recipes found for ${query}`);

    state.search.results = recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    // console.log(state.search);
    return state.search;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.currentPage) {
  state.search.currentPage = page;
  const start = (page - 1) * RES_PER_PAGE;
  const end = page * RES_PER_PAGE;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity *= newServings / state.recipe.servings;
  });
  state.recipe.servings = newServings;
  return state.recipe;
};

export const updateBookmarks = function () {
  if (state.recipe.isBookmarked) {
    const index = state.bookmarks.findIndex(
      bookmark => bookmark.id === state.recipe.id
    );
    state.bookmarks.splice(index, 1);
    state.recipe.isBookmarked = false;
  } else {
    state.bookmarks.push(state.recipe);
    state.recipe.isBookmarked = true;
  }

  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));

  // console.log(state.bookmarks);
  return [state.recipe, state.bookmarks];
};

export const loadBookmarks = function () {
  const localBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  if (localBookmarks) state.bookmarks = localBookmarks;
};
