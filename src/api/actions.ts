'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { scrypt, randomFill, createCipheriv, scryptSync, createDecipheriv } from 'node:crypto'

export function encryptCookieData (data: string): string {
  let value: string = ''
  scrypt(`${process.env.COOKIE_ENCRYPT_KEY}`, 'salt', 24, (err, key) => {
    if (err != null) throw err
    randomFill(new Uint8Array(16), (err, iv) => {
      if (err != null) throw err

      const cipher = createCipheriv(`${process.env.ENCRYPT_ALGORITHM}`, key, iv)

      let encrypted = cipher.update(data, 'utf8', 'hex')
      encrypted += cipher.final('hex')
      value = encrypted
    })
  })
  return value
}

export function decryptCookieData (data: string): string {
  const key = scryptSync(`${process.env.COOKIE_ENCRYPT_KEY}`, 'salt', 24)
  const iv = Buffer.alloc(16, 0)
  const decipher = createDecipheriv(`${process.env.ENCRYPT_ALGORITHM}`, key, iv)
  let decrypted: string = decipher.update(data, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

export async function handleLogin (userId: number): Promise<void> {
  try {
    const encryptedSessionData: string = encryptCookieData(userId.toString())
    cookies().set('session', encryptedSessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    })
  } catch (e) {
    redirect('/login-failure')
  }
}
