import { DisplayTable } from './components/helpers/table.jsx'
import React from 'React'
import ReactDOM from 'React-DOM'

function run() {
    ReactDOM.render(
    <DisplayTable
        url = "/vacancies"
        deleteUrl = "/vacancies/"
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