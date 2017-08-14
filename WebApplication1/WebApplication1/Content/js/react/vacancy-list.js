import {Table} from './table'
import React from 'React'
import ReactDOM from 'React-DOM'
import * as babel from 'babel-core';

function run() {
    ReactDOM.render(
    <Table
        url = "/api/vacancies/getallVacancies"
        deleteUrl = "/api/vacancies/DeleteVacancy/"
        editUrl = ""
        isVacancy = {true}
         />,
    document.getElementById('tableContent'))
}


const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}