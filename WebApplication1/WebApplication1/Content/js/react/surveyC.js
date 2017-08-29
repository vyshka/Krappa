import { Survey } from './components/survey/completeSurvey/index.jsx'
import React from 'React'
import ReactDOM from 'React-DOM'


function run() {
    ReactDOM.render(
        <Survey />,
        document.getElementById('root')
    )
}


const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}