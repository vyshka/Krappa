import {Stat} from './components/survey/surveyStat.jsx'
import React from 'React'
import ReactDOM from 'React-DOM'


function run() {
    ReactDOM.render(
        <Stat/>,
        document.getElementById('root'))
}


const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}