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
		async session({ session }){
			// let user = {
			// 	id: '1',
			// 	email: '1',
			// 	name: '/2'
			// }
			// let session2 = user

			// session =  session2 as any
			return session
		}
	}
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }