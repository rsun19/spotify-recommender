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
  // Use the async `crypto.scrypt()` instead.
  const key = scryptSync(`${process.env.COOKIE_ENCRYPT_KEY}`, 'salt', 24)
  // The IV is usually passed along with the ciphertext.
  const iv = Buffer.alloc(16, 0) // Initialization vector.

  const decipher = createDecipheriv(`${process.env.ENCRYPT_ALGORITHM}`, key, iv)

  // Encrypted using same algorithm, key and iv.
  const encrypted =
    'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa'
  let decrypted: string = decipher.update(encrypted, 'hex', 'utf8')
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
