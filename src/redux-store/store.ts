import {
  IngredientsState,
  ingredientsSlice
} from './states/ingredients'

import {
  configureStore,
  combineReducers
} from '@reduxjs/toolkit'
import {
  persistReducer,
  persistStore
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({ ingredients: ingredientsSlice.reducer })

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({ reducer: persistedReducer })

export const persistor = persistStore(store)

export interface AppStore {
  ingredients: IngredientsState
}