import {SurveyTable} from './surveyTable'
import React from 'React'
import ReactDOM from 'React-DOM'
import * as babel from 'babel-core'

function run() {
    ReactDOM.render(
    <SurveyTable
        url = "/api/Survey/GetAllSurveys"
        deleteUrl = "/api/Survey/DeleteSurvey/"
        editUrl = "/Admin/EditSurvey/"
         />,
    document.getElementById('tableContent'))
}


const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}