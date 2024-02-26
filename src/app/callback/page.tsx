'use client'

import "./callback.ts"
import { redirect, useSearchParams } from 'next/navigation'
import { getAccessToken } from "./callback";

export default function Callback() {
    const searchParams = useSearchParams()
    const code = searchParams.get('code') || null;
    const state = searchParams.get('state') || null;
    if (code == null) {
        redirect("/login-failure");
    } else if (code && state) {
        getAccessToken(code, state);
    }
}