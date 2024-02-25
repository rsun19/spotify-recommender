'use server'

const clientId: string = `${process.env.CLIENT_ID}`;
var redirect_uri = 'http://localhost:8888/callback';

// Adapted from https://www.programiz.com/javascript/examples/generate-random-strings
function generateRandomCharacters(count: number) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=!@#$%^&*()";
    let charString = "";
    for (let i = 0; i < count; i++) {
        charString += characters.charAt(Math.round(characters.length * Math.random()));
    }
    return charString;
}

export async function loginUser() {
    // insert API request
}