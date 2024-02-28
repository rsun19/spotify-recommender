'use server'

import { getUserProfile } from "./loginUser";
import { redirect } from 'next/navigation';

export const fetchAuthorizationToken = async(url: string, formData: URLSearchParams, buffer_encoding: string) => {
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
            console.log(`ACCESS TOKEN: ${data.access_token}`);
        } else {
            console.error('Access token not found in the response');
            redirect("/login-failure");
        }
    });
}