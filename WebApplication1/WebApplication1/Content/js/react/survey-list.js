import { SurveyTable } from './components/survey/surveyTable/index.jsx'
import React from 'React'
import ReactDOM from 'React-DOM'


function run() {
    ReactDOM.render(

      <SurveyTable
          url = "/api/Survey/GetAllSurveys"
          deleteUrl = "/surveys/"
          editUrl = "/Admin/EditSurvey/"
      />
      
      ,
    document.getElementById('tableContent'))
}


const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}