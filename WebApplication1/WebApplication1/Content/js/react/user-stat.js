import React from 'React'
import ReactDOM from 'React-DOM'
import {UserResults} from './components/user/UserResults.jsx'

function run() {
    ReactDOM.render(
    <UserResults
         />,
    document.getElementById('root'))
}


const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}