'use server'

import { getUserProfile } from './loginUser'
import { redirect } from 'next/navigation'

export const fetchAuthorizationToken = async (url: string, formData: URLSearchParams, bufferEncoding: string): Promise<void> => {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + bufferEncoding
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await getUserProfile(data.access_token, data.refresh_token)
      console.log(`ACCESS TOKEN: ${data.access_token}`)
    } else {
      console.error('Access token not found in the response')
      redirect('/login-failure')
    }
  })
}
