'use server'

import { redirect } from 'next/navigation';
import { getUser, updateAccessToken } from '../app/get-access-token/[code]/[state]/loginUser';

export const getNewSpotifyToken = async(email: string) => {
    const user = await getUser(email);
    const url: string = 'https://accounts.spotify.com/api/token';
    const client_id: string = `${process.env.CLIENT_ID}`;
    const client_secret: string = `${process.env.CLIENT_SECRET}`;
    const formData = new URLSearchParams();
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', user!.refreshToken!);
    await refetchAuthorizationToken(email, url, formData);
} 

const refetchAuthorizationToken = async(email:string ,url: string, formData: URLSearchParams) => {    
    await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
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
        if (data && 
            data.access_token && 
            data.refresh_token) {
            try {
                await updateAccessToken(email, data.access_token, data.refresh_token);
            } catch(e) {
                redirect("/login-failure")
            }
        } else {
            console.error('Access token not found in the response');
            redirect("/login-failure");
        }
    });
}