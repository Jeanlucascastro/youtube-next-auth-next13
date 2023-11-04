import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			email: string
			name: string
			token: JWT
		}
	}

	interface usuario {
		id: string
		email: string
		name: string
		token: JWT
	}
}