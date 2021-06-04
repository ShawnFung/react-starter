import React, { useReducer, useMemo, useContext, createContext } from 'react'

const initState = {
  step: 0,
  number: 0,
  count: 0
}
type initState = typeof initState
const MyContext = createContext<{ state: initState, dispatch: Function }>({ state: initState, dispatch: () => {}})

const Child = (props = {}) => {
  console.log('child render')
  const { state, dispatch } = useContext(MyContext)
  const { step, number, count } = state
  return useMemo(() => {
    return (
      <div>
        <p>step is : {step}</p>
        <p>number is : {number}</p>
        <p>count is : {count}</p>
        <hr />
        <div>
          <button onClick={() => dispatch({ type: 'stepInc'})}>step ++</button>
          <button onClick={() => dispatch({ type: 'numberInc'})}>number ++</button>
          <button onClick={() => dispatch({ type: 'count'})}>step + number</button>
        </div>
      </div>
    )
  }, [state.step, state.number, state.count, dispatch])
}

const reducer = (state: initState, action: reducerAction) => {
  switch (action.type){
    case 'stepInc':
      return Object.assign({}, state, { step: state.step + 1 })
    case 'numberInc':
      return Object.assign({}, state, { number : state.number  + 1 })
    case 'count':
      return Object.assign({}, state, { count: state.step + state.number })
    default:
      return state;
  }
}

export default ((props = {}) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      <Child />
    </MyContext.Provider>
  )
})
