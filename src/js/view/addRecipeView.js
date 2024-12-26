import { View } from './view.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe added successfully :)';

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  _showWindow() {
    this.renderUploadForm();
    this._window.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
  }

  _hideWindow() {
    this._window.classList.add('hidden');
    this._overlay.classList.add('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this._showWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this._hideWindow.bind(this));
    this._overlay.addEventListener('click', this._hideWindow.bind(this));
  }

  _addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  renderUploadForm() {
    const markup = `
    <form class="upload">
      <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input
          placeholder="Margarita Pizza "
          required
          name="title"
          type="text"
        />
        <label>URL</label>
        <input
          placeholder="https://www.vegrecipesofindia.com/margherita-pizza-recipe/"
          required
          name="sourceURL"
          type="text"
        />
        <label>Image URL</label>
        <input
          placeholder="https://www.vegrecipesofindia.com/wp-content/uploads/2020/12/margherita-pizza-4.jpg"
          required
          name="image"
          type="text"
        />
        <label>Publisher</label>
        <input
          placeholder="Dassana Amit"
          required
          name="publisher"
          type="text"
        />
        <label>Prep time</label>
        <input placeholder="20" required name="cookingTime" type="number" />
        <label>Servings</label>
        <input placeholder="7" required name="servings" type="number" />
      </div>

      <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
        <label>Ingredient 1</label>
        <input
          placeholder="Format: 'Quantity,Unit,Description'"
          type="text"
          name="ingredient-1"
        />
        <label>Ingredient 2</label>
        <input
          placeholder="3,cups,whole wheat flour"
          type="text"
          required
          name="ingredient-2"
        />
        <label>Ingredient 3</label>
        <input
          placeholder="0.5,cup,pizza sauce"
          type="text"
          name="ingredient-3"
        />
        <label>Ingredient 4</label>
        <input
          placeholder="200,g,mozzarella cheese"
          type="text"
          name="ingredient-4"
        />
        <label>Ingredient 5</label>
        <input type="text" name="ingredient-5" placeholder="20,,basil" />
        <label>Ingredient 6</label>
        <input
          placeholder=",,dried oregano"
          type="text"
          name="ingredient-6"
        />
      </div>

      <button class="btn upload__btn">
        <svg>
          <use href="src/img/icons.svg#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
      </button>
    </form>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new AddRecipeView();
