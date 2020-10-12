import apiService from './apiService.js'
import refs from './refs.js'
import template from '../template/template.hbs'
import debounce from 'lodash.debounce';
import * as basicLightbox from 'basiclightbox'
import "../../node_modules/basiclightbox/dist/basicLightbox.min.css"


refs.input.addEventListener('input',  
debounce( event => {
  event.preventDefault();
  refs.galleryList.innerHTML = '';
  apiService.query = event.target.value;
  refs.form.value = '';
  renderApi();
},2000),
);

refs.galleryList.addEventListener('click', (e) => {
  
  if(e.target.nodeName === "IMG"){
    let openImage = document.querySelector(".js-modal-image")
    let modalSrc = e.target.dataset.src
    const instance = basicLightbox.create(`
    <div class="modal">
    <img class = "js-modal-image" src = "${modalSrc}" alt = "" >
    </div>`)
    instance.show()
  }
  // modalSrc.dataset.index = e.target.dataset.index
  
  
});

function renderApi(){
  apiService.fetchImages().then(({hits}) => renderImages(hits));
}

function renderImages(data){
  const items = template(data)
  refs.galleryList.insertAdjacentHTML('beforeend', items)
    if (!refs.galleryList.length){
      refs.body.insertAdjacentElement('beforeend', loadMoreBtn);
      loadMoreBtn.classList.remove('hidden')
    } else {
      loadMoreBtn.classList.add('hidden');
  }
}

const loadMoreBtn = document.createElement('button')
loadMoreBtn.textContent = "Load more..."
loadMoreBtn.classList.add('loadMore-button');

loadMoreBtn.addEventListener('click', loadMore);

function loadMore (){
  apiService.setPage();
  apiService.fetchImages()
    .then(({hits}) => renderImages(hits));

  setTimeout(() => {
    window.scrollTo({
      top: document.documentElement.offsetHeight - 3700,
      behavior: 'smooth'
    });
  }, 1000);
}

// window.addEventListener('keydown', (e) => {
//   if(e.code ==='Escape'){
//     clearOverlay()
//   }
//   if(e.key === 'ArrowLeft'){
//     arrowLeft()
//   }
//   if(e.key === 'ArrowRight'){
//     arrowRight()
//   }
  
// })


// function setNewSrc (step, index){
//   console.log(step);
//   modalSrc.dataset.index = `${index + step}`
//   modalSrc.src = gallery[index + step].image
// }

// function arrowLeft (){
//   let index = +modalSrc.dataset.index
//   if(index === 0 ) {
//     setNewSrc(0, gallery.length - 1)
//     return
//   }
//   setNewSrc(-1, index)

// }
// function arrowRight (){
//   let index = +modalSrc.dataset.index
//   if (index === gallery.length - 1 ) {
//     setNewSrc(0, 0)
//     return
//   }
//   setNewSrc(1, index)
// }
