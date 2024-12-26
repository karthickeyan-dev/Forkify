import { View } from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.pagination__btn');
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
      return `${this._generateMarkupCurrPage(
        currentPage,
        maxPage
      )}${this._generateMarkupNxtBtn(currentPage)}`;
    }
    // last page with other pages
    if (currentPage !== 1 && currentPage === maxPage) {
      return `${this._generateMarkupPrevBtn(
        currentPage
      )}${this._generateMarkupCurrPage(currentPage, maxPage)}`;
    }
    // other page
    if (currentPage !== 1 && currentPage !== maxPage) {
      return `${this._generateMarkupPrevBtn(
        currentPage
      )}${this._generateMarkupCurrPage(
        currentPage,
        maxPage
      )}${this._generateMarkupNxtBtn(currentPage)}`;
    }
    // first page with no other pages
    if (currentPage === 1 && currentPage === maxPage) {
      return this._generateMarkupCurrPage(currentPage, maxPage);
    }
  }

  _generateMarkupPrevBtn(currentPage) {
    return `
    <button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>
    `;
  }

  _generateMarkupNxtBtn(currentPage) {
    return `
    <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }

  _generateMarkupCurrPage(currentPage, maxPage) {
    return `
    <div class="pagination__btn--curr">
      <span>${currentPage}/${maxPage}</span>
    </div>
    `;
  }
}

export default new PaginationView();
