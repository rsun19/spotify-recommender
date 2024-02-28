'use server'

import { Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { redirect } from 'next/navigation';

interface profile {
    name: string,
    email: string,
    premium: boolean,
    accessToken: string,
    refreshToken: string
}

export const getUser = async(email: string) => {
    const user = await prisma.user.findFirstOrThrow(
        {
            where: {
                email: email
            }
        }
    );
    return user;
}

export const updateAccessToken = async(email: string, accessToken: string, refreshToken: string) => {
    const user = await prisma.user.update(
        {
            where: {
                email: email
            },
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        }
    )
    return user;
}

export const insertUser = async(profile: profile) => {
    const user = await prisma.user.create({
        data: {
            name: profile.name,
            email: profile.email,
            premium: profile.premium,
            accessToken: profile.accessToken,
            refreshToken: profile.refreshToken
        }
    })
    return user;
}

export const getUserProfile = async(authorizationCode: string, refreshToken: string) => {
    const url = "https://api.spotify.com/v1/me";
    await fetch(url, {
        headers: {
            "Authorization": `Bearer ${authorizationCode}`
        }
    }).then(
        res => {
            if (!res.ok) {
                redirect("/login-failure");
            } else {
                return res.json();
            }
        }
    ).then(
        async profileData => {
            if (profileData && 
                profileData.display_name && 
                profileData.email && 
                profileData.product) {
                const profile: profile = {
                    name: profileData.display_name,
                    email: profileData.email,
                    premium: profileData.product == "premium" ? true : false,
                    accessToken: authorizationCode,
                    refreshToken: refreshToken
                }
                try {
                    await getUser(profileData.email);
                    await updateAccessToken(profileData.email, authorizationCode, profileData.refresh_token);
                } catch(e) {
                    await insertUser(profile);
                }
            }
        }
    )
}