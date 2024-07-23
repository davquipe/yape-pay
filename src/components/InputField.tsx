import { Box, TextFieldProps, styled } from '@mui/material'
import TextField from '@mui/material/TextField'
import clsx from 'clsx'
import React from 'react'

interface InputFieldProps {
	error?: boolean
	success?: boolean
}

type CombinedTextFieldProps = TextFieldProps & InputFieldProps

const InputField = React.forwardRef<HTMLDivElement, CombinedTextFieldProps>(
	({ error, className, success, ...rest }, ref) => {
		return (
			<Box ref={ref} sx={{ position: 'relative' }}>
				<CustomeTextField
					fullWidth
					className={clsx(className, {
						'input-error': error,
						'input-success': success,
					})}
					{...rest}
				/>
			</Box>
		)
	},
)

export default InputField

const CustomeTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		color: theme.palette.grey[800],
		backgroundColor: theme.palette.grey[100],
		'& .MuiOutlinedInput-notchedOutline': {
			borderWidth: 0,
		},
	},
	'&.input-error .MuiOutlinedInput-root': {
		color: theme.palette.grey[800],
		backgroundColor: 'transparent',
		// backgroundColor: theme.palette.grey[100],
		'& .MuiOutlinedInput-notchedOutline': {
			borderWidth: 1,
			borderColor: theme.palette.error.main,
		},
	},
	'&.input-success .MuiOutlinedInput-root': {
		backgroundColor: 'transparent',
		'& .MuiOutlinedInput-notchedOutline': {
			borderWidth: 1,
			borderColor: theme.palette.success.main,
		},
	},
	'&.input-error .MuiFormLabel-root': {
		color: theme.palette.error.main,
	},
	'&.input-success .MuiFormLabel-root': {
		color: theme.palette.success.contrastText,
	},
	'& .MuiFormHelperText-root': {
		color: theme.palette.error.main,
	},
	'&.input-error .MuiFormHelperText-root': {
		color: theme.palette.error.main,
	},
}))
