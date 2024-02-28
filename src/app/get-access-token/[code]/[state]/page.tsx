'use server'

import { redirect } from 'next/navigation';
import { getUserProfile } from "./loginUser";

const AccessToken = async ({ params }: { params: { code: string, state: string } }) => {
    console.log(params.code);
    const client_id: string = `${process.env.CLIENT_ID}`;
    const client_secret: string = `${process.env.CLIENT_SECRET}`;
    var redirect_uri = `${process.env.REDIRECT_URI}`;  
    const url:string  = "https://accounts.spotify.com/api/token";
    const formData = new URLSearchParams();
    formData.append('code', params.code);
    formData.append('redirect_uri', redirect_uri);
    formData.append('grant_type', 'authorization_code');
    const buffer_encoding = Buffer.from(client_id + ':' + client_secret).toString('base64');
    await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + buffer_encoding
          },
        body: formData.toString()
    }).then(
        res => {
            if (!res.ok) {
                redirect("/login-failure");
            } else {
                return res.json();
            }
        }
    ).then(async data => {
        if (data && data.access_token) {
            await getUserProfile(data.access_token);
            console.log(data.access_token);
        } else {
            console.error('Access token not found in the response');
            redirect("/login-failure");
        }
      });
    redirect("/");
}

export default AccessToken;