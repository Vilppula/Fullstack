import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  const someState = {
    good: 5,
    ok: 6,
    bad: 7
  }
  const action0 = {
    type: 'DO_NOTHING'
  }
  const action1 = {
    type: 'GOOD'
  }
  const action2 = {
    type: 'OK'
  }
  const action3 = {
    type: 'BAD'
  }
  const actionZ = {
    type: 'ZERO'
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    deepFreeze(state)
    const newState = counterReducer(undefined, action0)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, action1)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, action2)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, action3)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('reset will vanish all data', () => {
    const state = someState
    deepFreeze(state)
    var newState = counterReducer(state, action1)
    expect(newState).toEqual({
      good: 6,
      ok: 6,
      bad: 7
    })
    newState = counterReducer(newState, actionZ)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})