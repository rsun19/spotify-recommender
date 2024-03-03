'use server'

import { redirect } from 'next/navigation'
import { fetchAuthorizationToken } from './fetchAuthorizationToken'

const AccessToken = async ({ params }: { params: { code: string, state: string } }): Promise<void> => {
  const clientId: string = `${process.env.CLIENT_ID}`
  const clientSecret: string = `${process.env.CLIENT_SECRET}`
  const redirectUri = `${process.env.REDIRECT_URI}`
  const url: string = 'https://accounts.spotify.com/api/token'
  const formData = new URLSearchParams()
  formData.append('code', params.code)
  formData.append('redirect_uri', redirectUri)
  formData.append('grant_type', 'authorization_code')
  const bufferEncoding = Buffer.from(clientId + ':' + clientSecret).toString('base64')
  await fetchAuthorizationToken(url, formData, bufferEncoding)
  redirect('/')
}

export default AccessToken
