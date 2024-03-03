/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use server'

import prisma from '../../../../lib/prisma'
import { redirect } from 'next/navigation'

interface profile {
  name: string
  email: string
  premium: boolean
  accessToken: string
  refreshToken: string
}

interface User {
  id: number
  email: string
  name: string | null
  accessToken: string | null
  refreshToken: string | null
  photo: string | null
  premium: boolean
}

export const getUser = async (email: string): Promise<User> => {
  const user = await prisma.user.findFirstOrThrow(
    {
      where: {
        email
      }
    }
  )
  return user
}

export const updateAccessToken = async (email: string, accessToken: string, refreshToken: string): Promise<User> => {
  const user = await prisma.user.update(
    {
      where: {
        email
      },
      data: {
        accessToken,
        refreshToken
      }
    }
  )
  return user
}

export const insertUser = async (profile: profile): Promise<User> => {
  const user = await prisma.user.create({
    data: {
      name: profile.name,
      email: profile.email,
      premium: profile.premium,
      accessToken: profile.accessToken,
      refreshToken: profile.refreshToken
    }
  })
  return user
}

export const getUserProfile = async (authorizationCode: string, refreshToken: string): Promise<void> => {
  const url = 'https://api.spotify.com/v1/me'
  await fetch(url, {
    headers: {
      Authorization: `Bearer ${authorizationCode}`
    }
  }).then(
    async res => {
      if (!res.ok) {
        redirect('/loginfailure')
      } else {
        return await res.json()
      }
    }
  ).then(
    async profileData => {
      if ((Boolean((profileData?.display_name))) &&
                (Boolean(profileData.email)) &&
                (Boolean(profileData.product))) {
        const profile: profile = {
          name: profileData.display_name,
          email: profileData.email,
          premium: profileData.product === 'premium',
          accessToken: authorizationCode,
          refreshToken
        }
        try {
          await getUser(profileData.email)
          await updateAccessToken(profileData.email, authorizationCode, profileData.refresh_token)
        } catch (e) {
          await insertUser(profile)
        }
      }
    }
  )
}
