import {
  PayloadAction,
  createSlice
} from '@reduxjs/toolkit'

export interface IngredientsState {
  ingredients: string[]
  customIngredients: string[]
}

const initialState: IngredientsState = {
  ingredients: [],
  customIngredients: []
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredients(state, action: PayloadAction<string[]>) {
      state.ingredients = action.payload
    },
    addCustomIngredients(state, action: PayloadAction<string[]>) {
      state.customIngredients = action.payload
    },
    clearIngredients(state) {
      state.ingredients = []
    },
    clearCustomIngredients(state) {
      state.customIngredients = []
    }
  }
})

export const {
  addIngredients,
  addCustomIngredients,
  clearIngredients,
  clearCustomIngredients
} = ingredientsSlice.actions