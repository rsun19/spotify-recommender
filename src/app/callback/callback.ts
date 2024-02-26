'use server'

import { redirect } from 'next/navigation';

const client_id: string = `${process.env.CLIENT_ID}`;
const client_secret: string = `${process.env.CLIENT_SECRET}`;
var redirect_uri = 'http://localhost:8888/callback';

export async function getAccessToken(code: string, state: string) {
    var scope = 'user-read-private user-read-email';
    const url:string  = "https://accounts.spotify.com/api/token";
    const response_type = 'code';
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        body: new URLSearchParams({
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        })
    });
    redirect("/");
}