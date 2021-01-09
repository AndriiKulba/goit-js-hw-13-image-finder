import './styles.css';
import articlesTpl from './templates/gallery.hbs';
import NewsApiService from './js/apiService';
const refs = getRefs();
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return alert('Введи что-то нормальное');
  }

  newsApiService.resetPage();
  clearArticlesContainer();
  newsApiService.fetchArticles().then(hits => {
    appendArticlesMarkup(hits);
    newsApiService.incrementPage();
  });
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
    if (entry.isIntersecting && newsApiService.query !== '') {
      // console.log('Пора грузить еще статьи' + Date.now());
      newsApiService.fetchArticles().then(hits => {
        appendArticlesMarkup(hits);
        newsApiService.incrementPage();
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(refs.sentinel);
