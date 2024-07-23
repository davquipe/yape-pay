import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Controller, useForm } from 'react-hook-form'

import ImageYape from '../assets/images/logo.png'
import InputField from '../components/InputField'
import { Button, FormHelperText } from '@mui/material'
import { useEffect } from 'react'
import { apiUrlYape } from '../config'
import { useCreateTokenYapeMutation } from '../state/features/secureTokenApi'
import { useCreateChargeMutation } from '../state/features/culquiSecure'

interface FormValues {
	phone: string
	otp: string
}

export default function PageYape() {
	const {
		control,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			phone: '',
			otp: '',
		},
	})

	const [createTokenYape, { isLoading }] = useCreateTokenYapeMutation()
	const [createCharge] = useCreateChargeMutation()

	const otp = watch('otp')
	const onSubmit = async (data: FormValues) => {
		try {
			const response = await createTokenYape({
				otp: data.otp,
				number_phone: data.phone,
				amount: '1000',
			}).unwrap()

			const chargeResponse = await createCharge({
				amount: '1000',
				currency_code: 'PEN',
				email: response.email,
				source_id: response.id,
			}).unwrap()

			if (chargeResponse.outcome.user_message) {
				alert(chargeResponse.outcome.user_message)
			}
		} catch (error) {
			console.error(error)
		}
	}

	const handleOTPInput = (value: string, index: number) => {
		const newOtp = otp.split('')
		newOtp[index] = value
		setValue('otp', newOtp.join(''), { shouldValidate: true })

		if (value.length === 1 && index < 5) {
			const nextField = document.getElementById(`otp-${index + 1}`)
			if (nextField) {
				nextField.focus()
			}
		}
	}

	useEffect(() => {
		console.log(errors)
	}, [errors])

	console.log(apiUrlYape)

	return (
		<Container component={'form'} onSubmit={handleSubmit(onSubmit)}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					gap: 2,
					marginBottom: 2,
					padding: 2,
					borderRadius: 2,
					maxWidth: 400,
					margin: 'auto',
				}}>
				<Box
					component="img"
					src={ImageYape}
					alt="Yape"
					sx={{
						width: 100,
						height: 'auto',
						margin: 'auto',
					}}></Box>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Controller
							name="phone"
							rules={{
								required: 'El numero de celular es requerido',
								pattern: /[0-9]{9}/,
							}}
							control={control}
							render={({ field }) => (
								<InputField
									{...field}
									size="small"
									fullWidth
									error={!!errors.phone}
									helperText={
										errors.phone ? errors.phone.message : ''
									}
									placeholder="Ingrese su numero de celular"
									inputProps={{
										type: 'tel',
										pattern: '[0-9]{9}',
										maxLength: 9,
										onKeyPress: (e) => {
											if (!/[0-9]/.test(e.key)) {
												e.preventDefault()
											}
										},
									}}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2} justifyContent="center">
							{Array.from({ length: 6 }).map((_, index) => (
								<Grid item xs={2} key={index}>
									<Controller
										name="otp"
										control={control}
										rules={{
											required: 'El codigo es requerido',
											pattern: /[0-9]{6}/,
										}}
										render={({ field }) => (
											<InputField
												{...field}
												value={otp[index] || ''}
												onChange={(e) =>
													handleOTPInput(
														e.target.value,
														index,
													)
												}
												error={!!errors.otp}
												size="small"
												placeholder="0"
												inputProps={{
													maxLength: 1,
													id: `otp-${index}`,
													type: 'tel',
													pattern: '[0-9]{1}',
													sx: { textAlign: 'center' },
													onKeyPress: (e) => {
														if (
															!/[0-9]/.test(e.key)
														) {
															e.preventDefault()
														}
													},
												}}
												fullWidth
												autoComplete="off"
											/>
										)}
									/>
								</Grid>
							))}
							<FormHelperText
								sx={{
									marginTop: 1,
									textAlign: 'center',
									width: '100%',
									color: 'red',
								}}>
								{errors.otp ? errors.otp.message : ''}
							</FormHelperText>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Button
							type="submit"
							variant="outlined"
							color="secondary"
							fullWidth>
							{isLoading ? 'Cargando...' : 'Enviar'}
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Container>
	)
}
