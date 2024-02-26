'use client'

import { redirect, useSearchParams } from 'next/navigation'
import { getAccessToken } from "./callback";

export default function Callback() {
    const searchParams = useSearchParams()
    const code = searchParams.get('code') || null;
    const state = searchParams.get('state') || null;
    console.log(code)
    if (code == null) {
        redirect("/login-failure");
    } else {
        redirect(`/get-access-token/${code}/${state}`);
    }
}