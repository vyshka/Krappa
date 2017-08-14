import {QuestionForm} from './editForm'
import React from 'React'
import ReactDOM from 'React-DOM'
import * as babel from 'babel-core'

function run() {
    ReactDOM.render(
    <QuestionForm/>,
    document.getElementById('root'))
}


const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}
