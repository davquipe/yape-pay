import { createBrowserRouter } from 'react-router-dom'
import PageYape from '../pages/PageYape'

export default function AppRouter() {
	const router = createBrowserRouter([
		{
			path: '/',
			loader: () => ({ message: 'Hello Data Router!' }),
			element: <PageYape />,
		},
		{
			path: '*',
			loader: () => ({ message: '404 Not Found' }),
			element: <h3>Pagino no encontrada xD 🤣</h3>,
		},
	])
	return router
}
