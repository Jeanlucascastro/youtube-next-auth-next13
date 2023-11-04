import NextAuth, { NextAuthOptions, usuario } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

let tokenVar = 'text'
const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' }
			},

			async authorize(credentials, req) {
				const response = await fetch('http://localhost:8080/auth/login', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({
						login: credentials?.email,
						password: credentials?.password
					})
				})

				const data = await response.json()
				console.log('/', data)

				if (data) {
					return data
				}

				return null
			},
		})
	],
	pages: {
		signIn: '/'
	},
	callbacks: {
		async jwt({ token }) {
			return token
		},
		async session({ session, token, user }){


			if (user) {
				let usera = user as unknown as usuario

				session.user.id = usera.id
				session.user.email = usera.email
				session.user.name = usera.name
				session.user.token = token
				tokenVar = JSON.stringify(token);;

			}


			return session
		}
	}
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions, tokenVar }