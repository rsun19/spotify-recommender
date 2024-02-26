'use server'

import { redirect } from 'next/navigation';

const AccessToken = async ({ params }: { params: { code: string, state: string } }) => {
    const client_id: string = `${process.env.CLIENT_ID}`;
    const client_secret: string = `${process.env.CLIENT_SECRET}`;
    var redirect_uri = 'http://localhost:3000/callback';    
    const url:string  = "https://accounts.spotify.com/api/token";
    const formData = new URLSearchParams();
    formData.append('code', params.code);
    formData.append('redirect_uri', redirect_uri);
    formData.append('grant_type', 'authorization_code');
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
          },
        body: formData.toString()
    });
    if (!res.ok) {
        const responseBody = await res.text();
        console.error(`Bad Request: ${res.status} - ${res.statusText}`);
        console.error(`Response Body: ${responseBody}`);
        // Handle the error accordingly
    } else {
    // Process the successful response
    }
    console.log(res);
    //redirect("/");
}

export default AccessToken;