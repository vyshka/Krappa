import {Table} from './table'
import React from 'React'
import ReactDOM from 'React-DOM'
import * as babel from 'babel-core'

function run() {
    ReactDOM.render(
    <Table
        url = "/api/User/getAllUsers"
        deleteUrl = "/api/User/DeleteUser/"
        editUrl = ""
        isUser = {true}
         />,
    document.getElementById('tableContent'))
}


const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}