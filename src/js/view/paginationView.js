import { View } from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      // console.log(btn);
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      // console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.currentPage;
    const maxPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // first page with other pages
    if (currentPage === 1 && currentPage !== maxPage) {
      return this._generateMarkupNxtBtn(currentPage);
    }
    // last page with other pages
    if (currentPage !== 1 && currentPage === maxPage) {
      return this._generateMarkupPrevBtn(currentPage);
    }
    // other page
    if (currentPage !== 1 && currentPage !== maxPage) {
      return `${this._generateMarkupPrevBtn()}${this._generateMarkupNxtBtn()}`;
    }
    // first page with no other pages
    if (currentPage === 1 && currentPage === maxPage) {
      return '';
    }
  }

  _generateMarkupPrevBtn() {
    const currentPage = this._data.currentPage;

    return `
    <button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>
    `;
  }

  _generateMarkupNxtBtn() {
    const currentPage = this._data.currentPage;

    return `
    <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }
}

export default new PaginationView();
