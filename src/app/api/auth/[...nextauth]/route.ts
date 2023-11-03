import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

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
						email: credentials?.email,
						password: credentials?.password
					})
				})

				const data = await response.json()

				if (data && response.ok && data.token) {
					return { ...data, email: credentials?.email } // Incluindo o email na resposta do token
				}

				return null
			},
		})
	],
	pages: {
		signIn: '/'
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user
			}
			return token
		},
		async session({ session, token }){
			session = token.user as any
			return session
		}
	}
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }