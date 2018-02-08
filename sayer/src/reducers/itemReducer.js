import {SINGLE_ITEM} from '../actions'

const defaultState = {
  item: {
    id: '',
    name: '',
    comments: ''
  }
}

export default (state = defaultState, action) => {

    switch (action.type) {
      case SINGLE_ITEM:
        return {...state, item: action.payload}
        break;
      default:
        return {...state}
    }
}
