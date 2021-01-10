const API_KEY = '19823540-1f511813796e20603cd716e3a';
const BASE_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const searchParams = new URLSearchParams({
      q: this.searchQuery,
      page: this.page,
      per_page: 12,
      key: API_KEY,
    });
    const url = `${BASE_URL}&${searchParams}`;

    //pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => hits);
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
