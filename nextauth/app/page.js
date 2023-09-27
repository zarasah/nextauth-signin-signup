import Image from 'next/image'
import styles from './page.module.css'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import User from './components/user';

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log('session', session)
  return (
   <div>
    <h1>Next Auth Project</h1>
    <h1>Server Side Rendered</h1>
    <pre>{JSON.stringify(session)}</pre>
    <h1>Client Side Rendered</h1>
    <User /> 
   </div>
  )
}
