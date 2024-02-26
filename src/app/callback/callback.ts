'use server'

import { redirect } from 'next/navigation';

const client_id: string = `${process.env.CLIENT_ID}`;
var redirect_uri = 'http://localhost:8888/callback';

export async function getAccessToken(code: string, state: string) {
    var scope = 'user-read-private user-read-email';
    const url:string  = "https://accounts.spotify.com/authorize?";
    const response_type = 'code';
    const res = await fetch("");
    redirect("/");
}