import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
	MutationDefinition,
} from '@reduxjs/toolkit/query/react'
import { apiSecureYape } from '../../config'

interface CreateTokenYape {
	otp: string
	number_phone: string
	amount: string
}

export interface ResponseCreateToken {
	object: string
	type: string
	id: string
	email: string
	creation_date: number
	card_number: string
	last_four: string
	active: boolean
	iin: Iin
	client: Client
}

export interface Client {
	ip: string
	device_type: string
	browser: string
	device_fingerprint: null
	ip_country: string
	ip_country_code: string
}

export interface Iin {
	object: string
	issuer: Issuer
	bin: string
	card_brand: string
	card_type: string
	card_category: null
	installments_allowed: string[]
}

export interface Issuer {
	name: string
	country: string
	country_code: string
	website: string
	phone_number: string
}

export const secureTokenApi = createApi({
	reducerPath: 'secureTokenApi',
	baseQuery: fetchBaseQuery({
		baseUrl: apiSecureYape,
	}),
	endpoints: (builder) => ({
		createTokenYape: builder.mutation<ResponseCreateToken, CreateTokenYape>(
			{
				query: (data) => ({
					url: 'tokens/yape',
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer pk_test_8cuOBD2QcEypyg4c', // Note: Use environment variables for sensitive information like API keys
					},
					body: data,
				}),
			},
		),
	}),
})

export const { useCreateTokenYapeMutation } = secureTokenApi
