import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

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
    state.recipe.isBookmarked = state.bookmarks.some(
      bookmark => bookmark.id === id
    );
    // console.log(state.recipe);
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

export const getStateSearch = function () {
  return state.search;
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

  // console.log(state.bookmarks);
  return state.recipe;
};
