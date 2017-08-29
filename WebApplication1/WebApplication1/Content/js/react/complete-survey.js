import { SurveyList } from './components/survey/surveyList/index.jsx'
import React from 'React'
import ReactDOM from 'React-DOM'

function run() {
    ReactDOM.render(
    <SurveyList />,
    document.getElementById('root'))
}


const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}