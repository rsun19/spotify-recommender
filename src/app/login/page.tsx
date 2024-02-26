'use server'

import { redirect } from 'next/navigation';

const Login = () => {
    const client_id: string = `${process.env.CLIENT_ID}`;
    var redirect_uri = 'http://localhost:3000/callback';
    var scope = 'user-read-private%20user-read-email';
    const url:string  = "https://accounts.spotify.com/authorize?";
    const response_type = 'code';
    redirect(`${url}response_type=${response_type}&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`)
}

export default Login;