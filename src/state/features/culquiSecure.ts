import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiSecureYape } from '../../config'

interface YapeTokenResponse {
	// Define the expected response structure here
}

interface YapeTokenRequest {
	otp: string
	number_phone: string
	amount: string
}

interface ChargeRequest {
	amount: string
	currency_code: string
	email: string
	source_id: string
}

interface ChargeResponse {
	object: string
	capture: boolean
	capture_date: number
	authorization_code: string
	amount_refunded: number
	currency_code: string
	email: string
	antifraud_details: null
	source: Source
	fee_details: FeeDetails
	current_amount: number
	amount: number
	duplicated: boolean
	installments: number
	installments_amount: null
	creation_date: number
	description: null
	id: string
	reference_code: string
	metadata: Metadata
	transfer_id: null
	outcome: Outcome
	dispute: boolean
	statement_descriptor: string
	paid: boolean
	total_fee: number
	total_fee_taxes: number
	transfer_amount: number
}

interface FeeDetails {
	fixed_fee: Metadata
	variable_fee: VariableFee
}

interface Metadata {}

interface VariableFee {
	currency_code: string
	commision: number
	total: number
}

interface Outcome {
	code: string
	merchant_message: string
	user_message: string
	type: string
}

interface Source {
	object: string
	id: string
	type: string
	email: string
	creation_date: number
	card_number: string
	last_four: string
	active: boolean
	iin: Iin
	client: Client
	metadata: Metadata
}

interface Client {
	ip: string
	ip_country: string
	ip_country_code: string
	browser: string
	device_fingerprint: null
	device_type: string
}

interface Iin {
	object: string
	bin: string
	card_brand: string
	card_type: string
	card_category: null
	issuer: Issuer
	installments_allowed: string
}

interface Issuer {
	name: string
	country: string
	country_code: string
	website: string
	phone_number: string
}

export const culquiSecure = createApi({
	reducerPath: 'culquiSecure',
	baseQuery: fetchBaseQuery({ baseUrl: apiSecureYape }),
	endpoints: (builder) => ({
		createCharge: builder.mutation<ChargeResponse, ChargeRequest>({
			query: (data) => ({
				url: 'charges',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer sk_test_sVWl8mD3rMEoj15Y',
				},
				body: data,
			}),
		}),
	}),
})

export const { useCreateChargeMutation } = culquiSecure
