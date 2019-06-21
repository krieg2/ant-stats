import * as actionTypes from './actions.js';

const calculations = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.INIT_CALCULATION:
      return {
        ...state,
        [action.payload.id]: {
          calculating: false
        }
      }
    case actionTypes.START_CALCULATION:
      return {
        ...state,
        [action.payload.id]: {
          calculating: true,
          value: 0
        }
      }
    case actionTypes.END_CALCULATION:
      return {
        ...state,
         [action.payload.id]: {
            calculating: false,
            value: action.payload.value
        }
      }
    default:
      return state
  }
}

export default calculations;