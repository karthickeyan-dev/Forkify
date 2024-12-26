import * as model from './model.js';
import RecipeView from './view/recipeView.js';
import SearchView from './view/searchView.js';
import ResultsView from './view/resultsView.js';
import PaginationView from './view/paginationView.js';
import BookmarksView from './view/bookmarksView.js';
import AddRecipeView from './view/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import addRecipeView from './view/addRecipeView.js';

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    RecipeView.renderSpinner();

    ResultsView.update(model.getSearchResultsPage());

    const bookmarks = model.getStateProperty('bookmarks');
    BookmarksView.update(bookmarks);

    const recipe = await model.loadRecipe(id);
    RecipeView.render(recipe);
  } catch (err) {
    RecipeView.renderError();
  }
};

const controlServings = function (newServings) {
  const newRecipe = model.updateServings(newServings);
  // RecipeView.render(newRecipe);
  RecipeView.update(newRecipe);
};

const controlUpdateBookmark = function () {
  const [recipe, bookmarks] = model.updateBookmarks();
  RecipeView.update(recipe);
  BookmarksView.render(bookmarks);
  // console.log(recipe, bookmarks);
};

const controlSearchResults = async function () {
  try {
    const query = SearchView.getQuery();
    if (!query) return;

    ResultsView.renderSpinner();
    await model.loadSearchResults(query);
    ResultsView.render(model.getSearchResultsPage());

    const search = model.getStateProperty('search');
    PaginationView.render(search);
  } catch (err) {
    ResultsView.renderError(err);
  }
};

const controlPagination = function (goToPage) {
  ResultsView.render(model.getSearchResultsPage(goToPage));

  const search = model.getStateProperty('search');
  PaginationView.render(search);
};

const controlInitBookmarks = function () {
  model.loadBookmarks();

  const bookmarks = model.getStateProperty('bookmarks');
  BookmarksView.render(bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    AddRecipeView.renderSpinner();

    const recipe = await model.uploadRecipe(newRecipe);

    RecipeView.render(recipe);

    AddRecipeView.renderMessage();

    const bookmarks = model.getStateProperty('bookmarks');
    BookmarksView.render(bookmarks);

    window.history.pushState(null, '', `#${recipe.id}`);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};

const init = function () {
  BookmarksView.addHandlerInitBookmarks(controlInitBookmarks);
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerServings(controlServings);
  RecipeView.addHandlerBookmark(controlUpdateBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  AddRecipeView._addHandlerUpload(controlAddRecipe);
};
init();
