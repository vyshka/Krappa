import {LOAD_DATA} from '../constants/index.js'

const initialState = {
  data: []
};

export default function userstate(state = initialState, action) {
  switch(action.type) {
    case LOAD_DATA:
      return { ...state, data: action.data }

    default:
        return (state)
  }
}