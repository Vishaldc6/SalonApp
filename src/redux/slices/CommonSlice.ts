import {createReducer} from '@reduxjs/toolkit'

interface InitialStateType{

};

const initialState:InitialStateType = {

};

const commonReducer = createReducer(initialState, {
  increment: (state, action) => {

  },
  decrement: (state, action) => {

  }
})