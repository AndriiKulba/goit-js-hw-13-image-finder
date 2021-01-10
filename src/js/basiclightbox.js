const basicLightbox = require('basiclightbox');
import 'basiclightbox/dist/basicLightbox.min.css';

function getLargeImg(e) {
  const imgUrl = e.target.dataset.largeimg;

  const instance = basicLightbox.create(`
    <img src="${imgUrl}" width="800" height="600">
`);

  instance.show();
}
export default getLargeImg;
