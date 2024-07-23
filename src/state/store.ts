import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { secureTokenApi } from './features/secureTokenApi'
import { culquiSecure } from './features/culquiSecure'

const store = configureStore({
	reducer: {
		[secureTokenApi.reducerPath]: secureTokenApi.reducer,
		[culquiSecure.reducerPath]: culquiSecure.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			secureTokenApi.middleware,
			culquiSecure.middleware,
		),
	devTools: import.meta.env.MODE !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
