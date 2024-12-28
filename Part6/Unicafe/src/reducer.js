const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return state = {
        ...initialState,
        good: initialState.good += 1
      }
    case 'OK':
      return state = {
        ...initialState,
        ok: initialState.ok += 1
      }
    case 'BAD':
      return state = {
        ...initialState,
        bad: initialState.bad += 1
      }
    case 'ZERO':
      return state = {
        good: 0,
        ok: 0,
        bad: 0
      }
    default: return state
  }
  
}

export default counterReducer
