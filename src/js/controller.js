import * as model from './model.js';
import RecipeView from './view/recipeView.js';
import SearchView from './view/searchView.js';
import ResultsView from './view/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// module.hot && module.hot.accept();

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    RecipeView.renderSpinner();
    const recipe = await model.loadRecipe(id);
    RecipeView.render(recipe);
  } catch (err) {
    RecipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = SearchView.getQuery();
    if (!query) return;

    ResultsView.renderSpinner();
    const search = await model.loadSearchResults(query);
    ResultsView.render(search.results);
    // console.log(search);
  } catch (err) {
    ResultsView.renderError(err);
  }
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
};
init();
