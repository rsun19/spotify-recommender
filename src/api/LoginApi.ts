'use server'

import { redirect } from 'next/navigation'
import { getUser, updateAccessToken } from '../app/get-access-token/[code]/[state]/loginUser'

export const getNewSpotifyToken = async (email: string): Promise<void> => {
  const user = await getUser(email)
  const url: string = 'https://accounts.spotify.com/api/token'
  const formData = new URLSearchParams()
  formData.append('grant_type', 'refresh_token')
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-non-null-assertion
  formData.append('refresh_token', user!.refreshToken!)
  await refetchAuthorizationToken(email, url, formData)
}

const refetchAuthorizationToken = async (email: string, url: string, formData: URLSearchParams): Promise<void> => {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
  }).then(
    async res => {
      if (!res.ok) {
        redirect('/login-failure')
      } else {
        return await res.json()
      }
    }
  ).then(async data => {
    if ((Boolean((data?.access_token))) &&
            (Boolean(data.refresh_token))) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        await updateAccessToken(email, data.access_token, data.refresh_token)
      } catch (e) {
        redirect('/login-failure')
      }
    } else {
      console.error('Access token not found in the response')
      redirect('/login-failure')
    }
  })
}
