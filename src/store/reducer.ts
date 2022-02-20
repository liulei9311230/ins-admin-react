
import {GET_USERINFO} from './actionTypes'
const defauleValue = {
  userInfo: {},
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
  switch (action.type) {
    case GET_USERINFO:
      newState.userInfo = action.value
      return newState
  }
  return state
}

export default reducer