import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth/auth'
import eventReducer from './reducers/event/event'

const rootReducer = combineReducers({
    auth: authReducer,
    event: eventReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch