import * as model from './model.js';
import RecipeView from './view/recipeView.js';
import SearchView from './view/searchView.js';
import ResultsView from './view/resultsView.js';
import PaginationView from './view/paginationView.js';

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
    await model.loadSearchResults(query);
    ResultsView.render(model.getSearchResultsPage());

    const search = model.getStateSearch();
    PaginationView.render(search);
  } catch (err) {
    ResultsView.renderError(err);
  }
};

const controlPagination = function (goToPage) {
  ResultsView.render(model.getSearchResultsPage(goToPage));

  const search = model.getStateSearch();
  PaginationView.render(search);
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
};
init();
