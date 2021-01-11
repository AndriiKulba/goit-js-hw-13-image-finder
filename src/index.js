import './styles.css';
import articlesTpl from './templates/gallery.hbs';
import NewsApiService from './js/apiService';
import onFetchError from './js/pnotify';
import getLargeImg from './js/basiclightbox';

const refs = getRefs();
const newApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.articlesContainer.addEventListener('click', getLargeImg);

function onSearch(e) {
  e.preventDefault();
  newApiService.query = e.currentTarget.elements.query.value;

  if (newApiService.query === '') {
    onFetchError('За вашим запитом нічого не знайдено!!!');
    return;
  }

  newApiService.resetPage();
  clearArticlesContainer();
  // newApiService.fetchArticles().then(hits => {
  //   appendArticlesMarkup(hits);
  //   newApiService.incrementPage();
  // });
  observer.observe(refs.sentinel);
}

function appendArticlesMarkup(hits) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(hits));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}

function getRefs() {
  return {
    searchForm: document.querySelector('.search-form'),
    articlesContainer: document.querySelector('.js-articles-container'),
    sentinel: document.querySelector('#sentinel'),
  };
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && newApiService.query !== '') {
      newApiService.fetchArticles().then(hits => {
        appendArticlesMarkup(hits);
        newApiService.incrementPage();
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
// observer.observe(refs.sentinel);
