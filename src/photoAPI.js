import axios from 'axios';
axios.defaults.baseURL = 'http://pixabay.com/api/';
const API_KEY = '31824438-78542d665d1f1906f4741f5da';

export async function readPhoto(imageDesc, numberPage, perPage) {
  return await axios({
    method: 'get',
    params: {
      key: API_KEY,
      q: `${imageDesc}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: `${perPage}`,
      page: `${numberPage}`,
    },
  });
}
