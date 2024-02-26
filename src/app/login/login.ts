'use server'

import { redirect } from 'next/navigation';

const client_id: string = `${process.env.CLIENT_ID}`;
var redirect_uri = 'http://localhost:8888/callback';

export async function requestAuthorization() {
    var scope = 'user-read-private user-read-email';
    const url:string  = "https://accounts.spotify.com/authorize?";
    const response_type = 'code';
    redirect(`${url}response_type=${response_type}&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`);
}