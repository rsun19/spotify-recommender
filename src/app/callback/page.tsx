'use client'

import { redirect, useSearchParams } from 'next/navigation'

export default function Callback (): void {
  const searchParams = useSearchParams()
  const code = (searchParams.get('code') != null) || null
  const state = (searchParams.get('state') != null) || null
  if (code == null) {
    redirect('/login-failure')
  } else {
    redirect(`/get-access-token/${code}/${state}`)
  }
}
