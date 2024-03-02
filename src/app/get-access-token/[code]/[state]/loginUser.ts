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

export const getUser = async (email: string) => {
  const user = await prisma.user.findFirstOrThrow(
    {
      where: {
        email
      }
    }
  )
  return user
}

export const updateAccessToken = async (email: string, accessToken: string, refreshToken: string) => {
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

export const insertUser = async (profile: profile) => {
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

export const getUserProfile = async (authorizationCode: string, refreshToken: string) => {
  const url = 'https://api.spotify.com/v1/me'
  await fetch(url, {
    headers: {
      Authorization: `Bearer ${authorizationCode}`
    }
  }).then(
    async res => {
      if (!res.ok) {
        redirect('/login-failure')
      } else {
        return await res.json()
      }
    }
  ).then(
    async profileData => {
      if (profileData?.display_name &&
                profileData.email &&
                profileData.product) {
        const profile: profile = {
          name: profileData.display_name,
          email: profileData.email,
          premium: profileData.product == 'premium',
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
