import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AppThemeProvider from './theme/AppThemeProvider.tsx'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import store from './state/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<AppThemeProvider>
				<HelmetProvider>
					<App />
				</HelmetProvider>
			</AppThemeProvider>
		</Provider>
	</React.StrictMode>,
)
