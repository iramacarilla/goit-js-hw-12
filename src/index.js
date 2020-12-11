import './styles.css';
import debounce from 'lodash.debounce';
import templates from './hbs/markup.hbs';
import itemTemplate from './hbs/itemList.hbs'
import fetchCountries from './js/fetchCountries.js';


import "@pnotify/core/dist/PNotify.css";
import { error } from "@pnotify/core";
import "@pnotify/core/dist/BrightTheme.css";


const search = document.querySelector('#input')
const country = document.querySelector('.country')


function click() {
  error({
    text:
      "Too many matches found. Please enter a more specific query",
      delay: 3000,
  });
}

const dataHandler = (arr) => {
  if(arr.length > 10) {
    click();
    }

  else if (arr.length > 2 && arr.length < 10 )
  {
    updateOneCountryData(arr)
  }
  else if (arr.length === 1 )
  {
    updateData(arr)
  }
}

const getData = event =>
{
  if (event.target.value.length > 0)
  {
  country.innerHTML = '';
  const put = event.target.value;
  fetchCountries(put).then(dataHandler)}
  }

const updateData = (data) =>
 {const markup = templates(data);
  country.insertAdjacentHTML('beforeend', markup)
}

const updateOneCountryData = (data) =>
 {const markup = itemTemplate(data);
  country.insertAdjacentHTML('beforeend', markup)
}

search.addEventListener('input', _.debounce(getData, 500));


