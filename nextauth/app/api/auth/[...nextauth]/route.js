import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email"},
                password: { label: "Password", type: "password"},
                username: { label: "Username", type: "text", placeholder: "name"}
            },
            async authorize(credentials) {
                console.log('authorize------------------------------')
                // const user = {id: 1, name: "test", email: "test@test.com"}
                if (!credentials.email || !credentials.password) {
                    throw new Error('Please Enter an email and password');
                }

                const user = await axios.post("/login", credentials, {
                    baseURL: "http://localhost:4000"
                })
                if (!user) {
                    throw new Error('No user found')
                }

                return user.data.user;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async session({session}) {
            return session
        },
        async signIn({profile}) {
            console.log('profile', profile);
            if (profile) {
                const data = {
                    email: profile.email,
                    password: '12345'
                }
                const res = await axios.post('http://localhost:3000/api/register', data)
                // const res = await fetch('http://localhost:3000/api/register', {
                //     method: "POST",
                //     headers: {
                //         'Content-Type': 'application/json',
                //       },
                //       body: JSON.stringify(data),
                // })
                // const res = await fetch('http://localhost:4000/register', {
                //     method: "POST",
                //     headers: {
                //         'Content-Type': 'application/json',
                //       },
                //       body: JSON.stringify(data),
                // })
            }
            
            return true
        },
    },
    pages: {
        signIn: '/login',
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST} 