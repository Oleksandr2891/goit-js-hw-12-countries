import './sass/main.scss';
import _ from "lodash";
import cardCountry from './tmp/card-country.hbs';
import listCountries from './tmp/list-countries.hbs';
import { alert, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { defaults } from '@pnotify/core';

 
defaults.addModalClass = 'pnotify-window';
defaults.icon = null;
defaults.maxTextHeight = null;
defaults.shadow = true;
defaults.closer = true;


const searchWrapper = document.querySelector('.search-wrapper');
const input = document.querySelector('input');
const buttonSearch = document.querySelector('.button-search');

const renderPage = function (html) {
    searchWrapper.innerHTML = html;
};

const initEvent = function () {
    document.querySelector('#product-catalog').addEventListener('click', (e) => {
        if (e.target.tagName !== "P") return false
        onFetch(e.target.textContent);
    });
};

input.addEventListener('input', _.debounce(onInputSearch, 700));

buttonSearch.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') return false;
    console.log(event);
    event.preventDefault();
    searchWrapper.innerHTML = "";
    input.value = "";
});



function onInputSearch(event) {
    let nameSearch = "";
    if (event.target.value !== "") {
        nameSearch = event.target.value;
        onFetch(nameSearch);
    } else {
        onFetch();
    }
    return;
};


function onFetch(name) {
    fetch(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(response =>  response.ok ? response.json() : Promise.reject(response))
        .then(country => {
            if (country.length === 1) renderPage(cardCountry(country[0]));
            else if (country.length > 1 && country.length < 11) {
                renderPage(listCountries(country));
                initEvent();
            }
            else if (country.length > 10) {
                alert({
                    text: "Вам необходимо уточнить запрос",
                    type: 'info'
                  })
            }
         })
        .catch(() => {
            alert({
                    text: "По вашему запросу ничего не найдено!",
                    type: 'info'
                  })
        });
}



