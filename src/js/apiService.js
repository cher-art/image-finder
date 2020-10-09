import refs from './refs.js'

const key = '18623547-5f493ca6e7211638496d8c77e';
const baseUrl = `https://pixabay.com/api/`;
// let query = 'cat'
// let page = 1;
// let perPage = 12;


export default {
  _query: 'car', 
  page: 1,
  perPage: 12,
  fetchImages(){
    let url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${this._query}&page=${this.page}&per_page=${this.perPage}&key=${key}`;
    return fetch(url).then(res => res.json()).catch(error => displayError(error))

  } ,

  setPage(){
    return this.page++;
  },

  get query(){
    return this._query;
  },

  set query(newQuery){
    this._query = newQuery;
  }
};

function displayError(error){
  const element = document.createElement('h2')
  element.textContent = error;
  // refs.body.insertAdjacentElement("afterbegin", element)
  refs.body.prepend(element)
}

