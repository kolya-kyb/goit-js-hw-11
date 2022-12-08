import { readPhoto } from './photoAPI';
import { getItemTemplate } from './getItemTemplate';
import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/style.css';
import 'modern-normalize';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: '250',
});

const refs = {
  photoCards: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  wrapperbtn: document.querySelector('.button-wrapper'),
  topButton: document.querySelector('.top-button'),
};

let searchValue = '';
let numberPage = 1;
let totalhits = 0;
let perPage = 40;

refs.form.addEventListener('submit', handelSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreBtn);
refs.topButton.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});

window.addEventListener('scroll', () => {
  scrollY > 200
    ? refs.topButton.classList.remove('invisible')
    : refs.topButton.classList.add('invisible');
});

invisibleBtn();

function handleLoadMoreBtn() {
  numberPage += 1;
  updateGallery();
}

function handelSubmit(e) {
  e.preventDefault();
  cleanerGallery();
  invisibleBtn();

  numberPage = 1;

  const {
    elements: { searchQuery },
  } = e.currentTarget;

  if (searchQuery.value.trim() === '') {
    refs.form.reset();
    return Notify.info('Please fill in all the fields!');
  }

  searchValue = searchQuery.value;

  updateGallery();

  refs.form.reset();
}

async function searchResult() {
  try {
    const response = await readPhoto(searchValue, numberPage, perPage);

    let photo = response.data.hits.map(element => getItemTemplate(element));
    totalhits = response.data.totalHits;
    return photo;
  } catch (error) {
    Notify.failure('Opps, please try again');
    Loading.remove();
  }
}

async function updateGallery() {
  Loading.circle();
  let photo = await searchResult();
  if (photo.length === 0) {
    Loading.remove();
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  Loading.remove();
  renderPhoto(photo);
  lightbox.refresh();
  visibleBtn();
}

function renderPhoto(photo) {
  refs.photoCards.insertAdjacentHTML('beforeend', photo.join(''));
}
function cleanerGallery() {
  refs.photoCards.innerHTML = '';
}
function invisibleBtn() {
  refs.wrapperbtn.classList.add('invisible');
}

function visibleBtn() {
  let totalNumberPage = Math.ceil(totalhits / perPage);

  if (totalNumberPage === numberPage) {
    invisibleBtn();
    return Notify.info('All results are displayed');
  }
  refs.wrapperbtn.classList.remove('invisible');
}
