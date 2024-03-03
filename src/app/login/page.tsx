'use server'

import { redirect } from 'next/navigation'

const Login = (): void => {
  const clientId: string = `${process.env.CLIENT_ID}`
  const redirectUri = 'http://localhost:3000/callback'
  const scope = 'user-read-private%20user-read-email'
  const url: string = 'https://accounts.spotify.com/authorize?'
  const responseType = 'code'
  redirect(`${url}response_type=${responseType}&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`)
}

export default Login
