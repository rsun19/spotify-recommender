'use server'

import { Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { redirect } from 'next/navigation';

interface profile {
    name: string,
    email: string,
    premium: boolean
    accessToken: string
}

const getUser = async(email: string) => {
    const user = await prisma.user.findFirstOrThrow(
        {
            where: {
                email: email
            }
        }
    );
    return user;
}

const updateAccessToken = async(email: string, accessToken: string) => {
    const user = await prisma.user.update(
        {
            where: {
                email: email
            },
            data: {
                accessToken: accessToken
            }
        }
    )
    return user;
}

const insertUser = async(profile: profile) => {
    const user = await prisma.user.create({
        data: {
            name: profile.name,
            email: profile.email,
            premium: profile.premium,
            accessToken: profile.accessToken
        }
    })
    return user;
}

export const getUserProfile = async(authorizationCode: string) => {
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
            if (profileData && profileData.display_name && profileData.email && profileData.product) {
                const profile: profile = {
                    name: profileData.display_name,
                    email: profileData.email,
                    premium: profileData.product == "premium" ? true : false,
                    accessToken: authorizationCode
                }
                try {
                    await getUser(profileData.email);
                    await updateAccessToken(profileData.email, authorizationCode);
                } catch(e) {
                    await insertUser(profile);
                }
            }
        }
    )
}