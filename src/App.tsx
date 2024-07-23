import { Container } from '@mui/material'
import AppRouter from './router/AppRouter'
import { RouterProvider } from 'react-router-dom'

function App() {
	const router = AppRouter()
	return (
		<Container>
			<RouterProvider router={router} />
		</Container>
	)
}

export default App
