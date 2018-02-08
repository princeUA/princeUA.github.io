import {WINDOW_STATE} from '../actions'

const defaultState = {
  active: 'items'
}

export default (state = defaultState, action) => {

    switch (action.type) {
      case WINDOW_STATE:
        return {...state, active: action.payload}
        break;
      default:
        return {...state}
    }
}
