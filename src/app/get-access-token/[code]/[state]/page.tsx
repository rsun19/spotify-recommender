'use server'

import { redirect } from 'next/navigation';
import { fetchAuthorizationToken } from "./fetchAuthorizationToken";

const AccessToken = async ({ params }: { params: { code: string, state: string } }) => {
    const client_id: string = `${process.env.CLIENT_ID}`;
    const client_secret: string = `${process.env.CLIENT_SECRET}`;
    var redirect_uri = `${process.env.REDIRECT_URI}`;  
    const url:string  = "https://accounts.spotify.com/api/token";
    const formData = new URLSearchParams();
    formData.append('code', params.code);
    formData.append('redirect_uri', redirect_uri);
    formData.append('grant_type', 'authorization_code');
    const buffer_encoding = Buffer.from(client_id + ':' + client_secret).toString('base64');
    fetchAuthorizationToken(url, formData, buffer_encoding);
    redirect("/");
}

export default AccessToken;