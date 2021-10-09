const API_KEY = '23034123-dfb7a22dd10a0f412f945dcd2';

function fetchImg(query, page) {
  const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then(reseponse => {
    if (reseponse.ok) {
      return reseponse.json();
    }
    return Promise.reject(new Error(`There is no images for ${query}`));
  });
}
const api = { fetchImg };
export default api;
// https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12
