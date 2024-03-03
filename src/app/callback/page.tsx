'use client'

import { redirect, useSearchParams } from 'next/navigation'

export default function Callback (): void {
  const searchParams = useSearchParams()
  const code = (searchParams.get('code') != null) ? searchParams.get('code') : null
  const state = (searchParams.get('state') != null) ? searchParams.get('state') : null
  if (code == null) {
    redirect('/loginfailure')
  } else {
    redirect(`/get-access-token/${code}/${state}`)
  }
}
