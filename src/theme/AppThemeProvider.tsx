import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'

interface AppThemeProviderProps {
	children: React.ReactNode
}

const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
	const theme = createTheme({
		palette: {
			mode: 'light',
		},
		typography: {
			fontFamily: '"M PLUS Rounded 1c", sans-serif',
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: 'none',
						borderRadius: 8,
					},
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					root: {
						borderRadius: 8,
						'& .MuiOutlinedInput-notchedOutline': {
							borderWidth: 1,
						},
					},
				},
			},
		},
	})
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	)
}

export default AppThemeProvider
