import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Home Page</title>
                <meta name="description" content="Welcome to our Spotify recommender website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Welcome to Spotify Recommender</h1>
                <p>This is the home page of your application.</p>
                <p>
                    <Link href="/login">
                        <a>Go to Login</a>
                    </Link>
                </p>
            </main>
        </div>
    );
};

export default Home;
