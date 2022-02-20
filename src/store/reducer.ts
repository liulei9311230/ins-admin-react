
import {CHANGE_VALUE} from './actionTypes'
const defauleValue = {
  inputVal: '德善',
  arr: [
    '1111111',
    '22222222'
  ]
}

type actionType = {
  type: string,
  value: any
}

const reducer = (state = defauleValue, action: actionType) => {
  let newState = JSON.parse(JSON.stringify(state))
  if (action.type === CHANGE_VALUE) {
    newState.inputVal = action.value
    return newState
  }
  return state
}

export default reducer